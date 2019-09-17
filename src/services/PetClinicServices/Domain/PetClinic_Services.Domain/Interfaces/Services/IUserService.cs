using Microsoft.AspNetCore.Mvc;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Domain.Interfaces.Services
{
    public interface IUserService
    {
        Task<ApplicationUserRoleView> GetById(string userId);
        Task<IEnumerable<ApplicationUserRoleView>> GetAll();
        Task<ApplicationUserRoleView> Post(ApplicationUserRoleView user);
        Task Delete(string userId);
        Task<ApplicationUserRoleView> Edit(ApplicationUserRoleView user);
        Task<bool> ValidationLogin(string userName);

        Task<IEnumerable<ApplicationUser>> Pagination(int pageIndex, int pageSize);
    }
}
