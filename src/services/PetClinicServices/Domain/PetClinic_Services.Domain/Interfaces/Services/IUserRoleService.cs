using Microsoft.AspNetCore.Identity;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Domain.Interfaces.Services
{
    public interface IUserRoleService
    {
        Task<IEnumerable<IdentityRole>> GetRolesByUserId(string userId);
        Task<IEnumerable<ApplicationUser>> GetUsersByRoleId(string roleId);
        Task AddRolesByUser(string userId, IEnumerable<IdentityRole> roles);
        Task ClearAllRolesByUser(string userId);
    }
}
