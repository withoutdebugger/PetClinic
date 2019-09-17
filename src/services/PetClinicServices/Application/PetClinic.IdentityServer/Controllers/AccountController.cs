
using PetClinic.IdentityServer.Helpers;
using PetClinic.IdentityServer.Models;
using PetClinic.IdentityServer.ViewModels;
using IdentityModel;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Threading.Tasks;
using PetClinic.IdentityServer.Data;
using System.Security.Cryptography;
using System.Text;

namespace PetClinic.IdentityServer.Controllers
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly TestUserStore _users;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IClientStore _clientStore;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IEventService _events;
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly Settings Configuration;
        private readonly IdentityProfileService _contextoProfileService;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _contextDb;
        public AccountController(
                   IIdentityServerInteractionService interaction,
                   IClientStore clientStore, IConfiguration configuration, ApplicationDbContext contextDb,
        IAuthenticationSchemeProvider schemeProvider,
                   IOptions<Settings> Configuration, SignInManager<Usuario> signInManager, RoleManager<IdentityRole> roleManager, UserManager<Usuario> userManager,
                   IEventService events,
                   TestUserStore users = null

                   )
        {
            _users = users;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _interaction = interaction;
            _clientStore = clientStore;
            _schemeProvider = schemeProvider;
            _events = events;
            _configuration = configuration;
            _contextDb = contextDb;

            this.Configuration = Configuration.Value;


        }



        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var vm = await BuildLoginViewModelAsync(returnUrl);

            if (vm.IsExternalLoginOnly)
            {
                return RedirectToAction("Challenge", "External", new { provider = vm.ExternalLoginScheme, returnUrl });
            }

            return View(vm);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginInputModel model, string button)
        {

            model.LoginFailure = null;
            var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);

            if (button != "login")
            {
                if (context != null)
                {
                    await _interaction.GrantConsentAsync(context, ConsentResponse.Denied);
                    return Redirect(model.ReturnUrl);
                }
                else
                {
                    return Redirect("~/");
                }
            }


            if (ModelState.IsValid)
            {
                var checkPassword = false;
                var passwordHash = GetMDSHash(model.Password);

                var user = _contextDb.Users.Where(x => x.UserName == model.User).FirstOrDefault();
                if (user != null)
                {
                    if (passwordHash == user.PasswordHash && user != null)
                        checkPassword = true;
                    if (user != null && checkPassword)
                    {
                                await _events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id.ToString(), user.UserName));

                                AuthenticationProperties props = null;
                                if (AccountOptions.AllowRememberLogin && model.RememberLogin)
                                {
                                    props = new AuthenticationProperties
                                    {
                                        IsPersistent = true,
                                        ExpiresUtc = DateTimeOffset.UtcNow.Add(AccountOptions.RememberMeLoginDuration)
                                    };
                                };

                                await HttpContext.SignInAsync(user.Id.ToString(), user.UserName, props);

                                if (context != null)
                                {
                                    if (await _clientStore.IsPkceClientAsync(context.ClientId))
                                    {

                                        return View("Redirect", new RedirectViewModel { RedirectUrl = model.ReturnUrl });
                                    }

                                    return Redirect(model.ReturnUrl);
                                }

                                if (Url.IsLocalUrl(model.ReturnUrl))
                                {
                                    return Redirect(model.ReturnUrl);
                                }
                                else if (string.IsNullOrEmpty(model.ReturnUrl))
                                {
                                    return Redirect("~/");
                                }
                                else
                                {
                                    throw new Exception("invalid return URL");
                                }
                        
                    }
                    else
                    {
                        await this.MessageReturn(model, "Usuario o contraseña incorrectos");
                    }


                }
                else
                {
                    await this.MessageReturn(model, "No existe el usuario ingresado");

                }

            }



            else
            {
                await this.MessageReturn(model, "Debe completar todos los campos");
            }




            var vm = await BuildLoginViewModelAsync(model);
            if (vm.User != null)
                HttpContext.Session.SetString("user", vm.User);
            return View(vm);
        }





        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            var vm = await BuildLogoutViewModelAsync(logoutId);

            if (vm.ShowLogoutPrompt == false)
            {
                return await Logout(vm);
            }

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LogoutInputModel model)
        {
            var vm = await BuildLoggedOutViewModelAsync(model.LogoutId);

            if (User?.Identity.IsAuthenticated == true)
            {
                await HttpContext.SignOutAsync();

                await _events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            if (vm.TriggerExternalSignout)
            {

                string url = Url.Action("Logout", new { logoutId = vm.LogoutId });

                return SignOut(new AuthenticationProperties { RedirectUri = url }, vm.ExternalAuthenticationScheme);
            }

            return Redirect(Configuration.UrlLogout);
        }


        private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl)
        {
            var context = await _interaction.GetAuthorizationContextAsync(returnUrl);
            if (context?.IdP != null)
            {
                return new LoginViewModel
                {
                    EnableLocalLogin = false,
                    ReturnUrl = returnUrl,
                    User = context?.LoginHint,
                    ExternalProviders = new ExternalProvider[] { new ExternalProvider { AuthenticationScheme = context.IdP } }
                };
            }

            var schemes = await _schemeProvider.GetAllSchemesAsync();

            var providers = schemes
                .Where(x => x.DisplayName != null ||
                            (x.Name.Equals(AccountOptions.WindowsAuthenticationSchemeName, StringComparison.OrdinalIgnoreCase))
                )
                .Select(x => new ExternalProvider
                {
                    DisplayName = x.DisplayName,
                    AuthenticationScheme = x.Name
                }).ToList();

            var allowLocal = true;
            if (context?.ClientId != null)
            {
                var client = await _clientStore.FindEnabledClientByIdAsync(context.ClientId);
                if (client != null)
                {
                    allowLocal = client.EnableLocalLogin;

                    if (client.IdentityProviderRestrictions != null && client.IdentityProviderRestrictions.Any())
                    {
                        providers = providers.Where(provider => client.IdentityProviderRestrictions.Contains(provider.AuthenticationScheme)).ToList();
                    }
                }
            }

            return new LoginViewModel
            {
                AllowRememberLogin = AccountOptions.AllowRememberLogin,
                EnableLocalLogin = allowLocal && AccountOptions.AllowLocalLogin,
                ReturnUrl = returnUrl,
                User = context?.LoginHint,
                ExternalProviders = providers.ToArray()
            };
        }


        private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginInputModel model)
        {
            var vm = await BuildLoginViewModelAsync(model.ReturnUrl);
            vm.User = model.User;
            vm.RememberLogin = model.RememberLogin;
            vm.LoginFailure = model.LoginFailure;
            vm.Error = model.Error;
            return vm;
        }

        private async Task<LogoutViewModel> BuildLogoutViewModelAsync(string logoutId)
        {
            var vm = new LogoutViewModel { LogoutId = logoutId, ShowLogoutPrompt = AccountOptions.ShowLogoutPrompt };

            if (User?.Identity.IsAuthenticated != true)
            {
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            var context = await _interaction.GetLogoutContextAsync(logoutId);
            if (context?.ShowSignoutPrompt == false)
            {
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            return vm;
        }

        private async Task<LoggedOutViewModel> BuildLoggedOutViewModelAsync(string logoutId)
        {
            var logout = await _interaction.GetLogoutContextAsync(logoutId);

            var vm = new LoggedOutViewModel
            {
                AutomaticRedirectAfterSignOut = AccountOptions.AutomaticRedirectAfterSignOut,
                PostLogoutRedirectUri = logout?.PostLogoutRedirectUri,
                ClientName = string.IsNullOrEmpty(logout?.ClientName) ? logout?.ClientId : logout?.ClientName,
                SignOutIframeUrl = logout?.SignOutIFrameUrl,
                LogoutId = logoutId
            };

            if (User?.Identity.IsAuthenticated == true)
            {
                var idp = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;
                if (idp != null && idp != IdentityServer4.IdentityServerConstants.LocalIdentityProvider)
                {
                    var providerSupportsSignout = await HttpContext.GetSchemeSupportsSignOutAsync(idp);
                    if (providerSupportsSignout)
                    {
                        if (vm.LogoutId == null)
                        {
                            vm.LogoutId = await _interaction.CreateLogoutContextAsync();
                        }

                        vm.ExternalAuthenticationScheme = idp;
                    }
                }
            }

            return vm;
        }


        #region Methods Private
        private async Task MessageReturn(LoginInputModel model,string error)
        {
            await _events.RaiseAsync(new UserLoginFailureEvent(model.User, "Credenciales inválidas", true));
            ModelState.AddModelError("", AccountOptions.InvalidCredentialsErrorMessage);
            model.LoginFailure = true;
            model.Error = error;
        }

        private static string GetMDSHash(string input)
        {
            SHA512 shaM = new SHA512Managed();
            // Convert the input string to a byte array and compute the hash.
            byte[] data = shaM.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            // Return the hexadecimal string.
            input = sBuilder.ToString();
            return (input);

        }
        #endregion
    }

}
