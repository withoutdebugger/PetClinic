using PetClinic_Services.Application.Services;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetClinic_Services.Controllers
{
    [ApiVersion("2.0")]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        #region Attributes
        private readonly RoleService _roleService;
        #endregion

        #region Constructor
        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }
        #endregion

        #region Methods Publics

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IdentityRole> GetById(string id)
        {
            return await _roleService.GetById(id);
        }


        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable<IdentityRoleView>> GetAll()
        {
            return await _roleService.GetAll();
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task Post(IdentityRole user)
        {
            await _roleService.Post(user);
        }


        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task Edit(IdentityRole user)
        {
            await _roleService.Edit(user);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task Delete(string id)
        {
            await _roleService.Delete(id);
        }

        [HttpGet("Pagination/{pageIndex}/{pageSize}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable<IdentityRole>> Pagination(int pageIndex, int pageSize)
        {
            return await _roleService.Pagination(pageIndex, pageSize);
        }
        #endregion
    }
}
