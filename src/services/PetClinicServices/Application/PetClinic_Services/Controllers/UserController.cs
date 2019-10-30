using PetClinic_Services.Application.Services;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetClinic_Services.Controllers
{
    [ApiVersion("2.0")]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Attributes
        private readonly UserService _userService;
        #endregion

        #region Constructor
        public UserController(UserService userService)
        {
            _userService = userService;
        }
        #endregion

        #region Methods Publics

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<ApplicationUserRoleView> GetById(string id)
        {
            return await _userService.GetById(id);
        }


        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable<ApplicationUserRoleView>> GetAll()
        {
            return await _userService.GetAll();
        }

        [HttpGet("SelectView")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IEnumerable<SelectView> GetAllSelectView()
        {
            return _userService.GetAllSelectView();
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IActionResult Post(ApplicationUserRoleView user)
        {
            try
            {
                return Ok(_userService.Post(user));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("ValidationLogin/{userName}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> ValidationLogin(string userName)
        {
            try
            {
                return Ok(await _userService.ValidationLogin(userName));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IActionResult Edit(ApplicationUserRoleView user)
        {
            try
            {
                return Ok(_userService.Edit(user));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IActionResult Delete(string id)
        {
            try
            {
                return Ok(_userService.Delete(id));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        [HttpGet("Pagination/{pageIndex}/{pageSize}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable<ApplicationUser>> Pagination(int pageIndex, int pageSize)
        {
            return await _userService.Pagination(pageIndex, pageSize);
        }
        #endregion
    }
}
