using AutoMapper.Configuration;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace PetClinic.IdentityServer.Helpers

{
    public class Config
    {
       
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
                {
                    new ApiResource("configAPI", "Configuracion API"),
                };
        }
        public static IEnumerable<Client> GetClients(IConfiguration configuration)
        {
            string webURL = configuration.GetValue<string>("Urls:urlWeb");
            string homeURL = configuration.GetValue<string>("Urls:urlHome");
            string callbackURL = configuration.GetValue<string>("Urls:urlCallback");

            return new List<Client>
                {
                  new Client
                    {
                        ClientId = "petClinic",
                        ClientName = "Pet Client",
                        AllowedGrantTypes = GrantTypes.ImplicitAndClientCredentials,
                        RequireConsent = false,
                        AllowAccessTokensViaBrowser = true,

                        AllowedCorsOrigins = { webURL },
                                       // where to redirect to after login
                        RedirectUris = { callbackURL },
                        
                        // where to redirect to after logout
                        PostLogoutRedirectUris = { homeURL },
                          ClientSecrets =
                        {
                            new Secret("miSecreto".Sha256())
                        },
                        AllowedScopes = new List<string>
                        {
                            IdentityServerConstants.StandardScopes.OpenId,
                            IdentityServerConstants.StandardScopes.Profile,
                            IdentityServerConstants.StandardScopes.Email
                        },
                    }
                };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
                {
                    new IdentityResources.OpenId(),
                    new IdentityResources.Profile(),
                    new IdentityResources.Email()
                    
                };
        }
    }
}
