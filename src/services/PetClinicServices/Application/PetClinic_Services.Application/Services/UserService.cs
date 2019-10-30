using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using PetClinic_Services.Persistence.Data;

namespace PetClinic_Services.Application.Services
{
    public class UserService : IUserService
    {
        #region Atributtes
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IdentityContext _dbContext;

        #endregion

        #region Constructor
        public UserService(UserManager<ApplicationUser> userManager, IdentityContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }
        #endregion

        #region Methods Publics
        public async Task<ApplicationUserRoleView> GetById(string userId)
        {
            try
            {
                var getUserById = _dbContext.Users.Where(x => x.Id == userId).FirstOrDefault();

                var getUserRole = await _dbContext.UserRoles.Where(x => x.UserId == getUserById.Id).Select(x => x.RoleId).ToListAsync();

                return new ApplicationUserRoleView { Roles = getUserRole, User = getUserById };
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

      

      
        public async Task<IEnumerable<ApplicationUserRoleView>> GetAll()
        {
            try
            {
                List<ApplicationUserRoleView> listUsers = new List<ApplicationUserRoleView>();
                var getUser = await _userManager.Users.ToListAsync();
                foreach (var item in getUser)
                {
                    ApplicationUserRoleView users = new ApplicationUserRoleView();
                    users.User = item;
                    listUsers.Add(users);
                }
                return listUsers;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public IEnumerable<SelectView> GetAllSelectView()
        {
            try
            {
                return (from c in _userManager.Users.ToList()
                        select new SelectView
                        {
                            Value = c.Id,
                            Label = c.LastName + ", " + c.FirstName
                        }).ToList();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        

        public async Task<ApplicationUserRoleView> Post(ApplicationUserRoleView user)
        {
            try
            {
                ApplicationUserRoleView userModel = new ApplicationUserRoleView();
                user.User.SecurityStamp = Guid.NewGuid().ToString();
                user.User.PasswordHash = GetMDSHash(user.User.PasswordHash);
                _dbContext.Users.Add(user.User);
                await _dbContext.SaveChangesAsync();
                foreach (var item in user.Roles)
                {
                    IdentityUserRole<string> userRole = new IdentityUserRole<string>
                    {
                        RoleId = item,
                        UserId = user.User.Id
                    };
                    await _dbContext.UserRoles.AddAsync(userRole);
                }
                await _dbContext.SaveChangesAsync();

                var userById = await _userManager.FindByIdAsync(user.User.Id);
                userModel.User = userById;
                return userModel;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task Delete(string userId)
        {
            try
            {
                var rolesByUserId = await _dbContext.UserRoles.Where(x => x.UserId == userId).ToListAsync();
                if (rolesByUserId.Count > 0)
                {
                    _dbContext.RemoveRange(rolesByUserId);
                    await _dbContext.SaveChangesAsync();
                }

                var user =_dbContext.Users.Where(x => x.Id == userId).FirstOrDefault();
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
                
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task<ApplicationUserRoleView> Edit(ApplicationUserRoleView user)
        {
            try
            {
                ApplicationUserRoleView userModel = new ApplicationUserRoleView();
                var getUserById = await GetById(user.User.Id);
                getUserById.User.Email = user.User.Email;
                getUserById.User.SecurityStamp = Guid.NewGuid().ToString();
                getUserById.User.UserName = user.User.UserName;
                getUserById.User.PasswordHash = GetMDSHash(user.User.PasswordHash);

                await _userManager.UpdateAsync(getUserById.User);
                if (user.Roles != null)
                {
                    var rolesByUserId = _dbContext.UserRoles.Where(x => x.UserId == user.User.Id).ToList();
                    if (rolesByUserId.Count > 0)
                    {
                        _dbContext.RemoveRange(rolesByUserId);
                        await _dbContext.SaveChangesAsync();
                    }

                    if (user.Roles.Count > 0)
                    {
                        foreach (var item in user.Roles)
                        {
                            IdentityUserRole<string> userRole = new IdentityUserRole<string>
                            {
                                RoleId = item,
                                UserId = user.User.Id
                            };
                            await _dbContext.UserRoles.AddAsync(userRole);
                        }
                        await _dbContext.SaveChangesAsync();
                    }
                }


                var userById = _dbContext.Users.Where(x => x.Id == user.User.Id).FirstOrDefault();
                userModel.User = userById;

                return userModel;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task<bool> ValidationLogin(string userName)
        {
            try
            {
                var user = await _userManager.Users.Where(x => x.UserName == userName).FirstOrDefaultAsync();
                if (user == null)
                    return false;
                else
                    return true;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<IEnumerable<ApplicationUser>> Pagination(int pageIndex, int pageSize)
        {
            try
            {
                var count = await _userManager.Users.CountAsync();

                return await _userManager.Users
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize).ToListAsync();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }
        #endregion

        #region Methods Privates
        private static string GetMDSHash(string input)
        {
            SHA512 shaM = new SHA512Managed();
            byte[] data = shaM.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            input = sBuilder.ToString();
            return (input);

        }
        #endregion

    }
}
