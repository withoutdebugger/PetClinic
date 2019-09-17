
using Microsoft.AspNetCore.Identity;
using PetClinic_Services.Domain.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Domain.Interfaces.Services
{
    public interface IRoleService
    {
        Task<IdentityRole> GetById(string roleId);
        Task<IEnumerable<IdentityRoleView>> GetAll();
        Task Post(IdentityRole user);
        Task Delete(string roleId);
        Task Edit(IdentityRole user);
        Task<IEnumerable<IdentityRole>> Pagination(int pageIndex, int pageSize);
    }
}
