using PetClinic_Services.Application.Services;
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
    public class UserRoleController : ControllerBase
    {
        #region Attributes
        private readonly UserRoleService _userRoleService;
        #endregion

        #region Constructor
        public UserRoleController(UserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }
        #endregion

        #region Methods Publics

        [HttpGet("GetRolesByUserId/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable<IdentityRole>> GetRolesByUserId(string id)
        {
            return await _userRoleService.GetRolesByUserId(id);
        }


        [HttpGet("GetUsersByRoleId/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable<ApplicationUser>> GetUsersByRoleId(string id)
        {
            return await _userRoleService.GetUsersByRoleId(id);
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task AddRolesByUser(string userId, IEnumerable<IdentityRole> roles)
        {
            await _userRoleService.AddRolesByUser(userId, roles);
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task ClearAllRolesByUser(string userId)
        {
            await _userRoleService.ClearAllRolesByUser(userId);
        }
        #endregion
    }
}
