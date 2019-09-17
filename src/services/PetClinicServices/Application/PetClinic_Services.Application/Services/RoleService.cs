using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Interfaces;
using PetClinic_Services.Domain.Interfaces.Services;
using PetClinic_Services.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Application.Services
{
    public class RoleService : IRoleService
    {
        #region Atributtes
        private readonly RoleManager<IdentityRole> _roleManager;
        #endregion

        #region Constructor
        public RoleService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        #endregion

        #region Methods Publics
        public async Task<IdentityRole> GetById(string userId)
        {
            try
            {
                return await _roleManager.FindByIdAsync(userId);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<IEnumerable<IdentityRoleView>> GetAll()
        {
            try
            {
                var getAllRoles = (from r in await _roleManager.Roles.ToListAsync()
                                   select new IdentityRoleView
                                   {
                                       Label = r.Name,
                                       Value = r.Id
                                   }).ToList();
                return getAllRoles;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task Post(IdentityRole user)
        {
            try
            {
                await _roleManager.CreateAsync(user);
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
                var userById = await _roleManager.FindByIdAsync(userId);

                if (userById != null)
                    await _roleManager.DeleteAsync(userById);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task Edit(IdentityRole user)
        {
            try
            {
                await _roleManager.UpdateAsync(user);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task<IEnumerable<IdentityRole>> Pagination(int pageIndex, int pageSize)
        {
            try
            {
                var count = await _roleManager.Roles.CountAsync();

                return await _roleManager.Roles
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize).ToListAsync();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }
        #endregion

    }
}
