using PetClinic_Services.Domain.Interfaces.Services;
using PetClinic_Services.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PetClinic_Services.Persistence.Data;

namespace PetClinic_Services.Application.Services
{
    public class UserRoleService : IUserRoleService
    {
        #region Atributtes
        private readonly IdentityContext _context;
        #endregion

        #region Constructor
        public UserRoleService(IdentityContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods Publics
        public async Task<IEnumerable<IdentityRole>> GetRolesByUserId(string userId)
        {
            try
            {
                var rolesByUserId = await (from ur in _context.UserRoles
                                           join u in _context.Users on ur.UserId equals u.Id
                                           join r in _context.Roles on ur.RoleId equals r.Id
                                           where u.Id == userId
                                           orderby r.Name
                                           select r).ToListAsync();

                return rolesByUserId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<IEnumerable<ApplicationUser>> GetUsersByRoleId(string roleId)
        {
            try
            {
                var usersByRoleId = await (from ur in _context.UserRoles
                                           join u in _context.Users on ur.UserId equals u.Id
                                           join r in _context.Roles on ur.RoleId equals r.Id
                                           where r.Id == roleId
                                           orderby u.UserName
                                           select u).ToListAsync();

                return usersByRoleId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task AddRolesByUser(string userId, IEnumerable<IdentityRole> roles)
        {
            try
            {
                await this.ClearAllRolesByUser(userId);

                foreach (var r in roles)
                {
                    IdentityUserRole<string> identityUserRole = new IdentityUserRole<string>
                    {
                        RoleId = r.Id,
                        UserId = userId
                    };
                    await _context.UserRoles.AddAsync(identityUserRole);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task ClearAllRolesByUser(string userId)
        {
            try
            {
                var rolesByUserId = await this.GetAllRolesByUserId(userId);

                if (rolesByUserId.Count() > 0)
                    _context.UserRoles.RemoveRange(rolesByUserId);

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        #endregion

        #region Methods Privated
        private async Task<IEnumerable<IdentityUserRole<string>>> GetAllRolesByUserId(string userId)
        {
            try
            {
                return await _context.UserRoles.Where(x => x.UserId == userId).ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        #endregion
    }

}
