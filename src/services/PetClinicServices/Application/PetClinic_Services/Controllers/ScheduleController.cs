using PetClinic_Services.Application.Services;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PetClinic_Services.Persistence.Models;

namespace PetClinic_Services.Controllers
{
    [ApiVersion("2.0")]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        #region Attributes
        private readonly ScheduleService _scheduleService;
        #endregion

        #region Constructor
        public ScheduleController(ScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }
        #endregion

        #region Methods Publics

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public Schedule GetById(int id)
        {
            return _scheduleService.GetById(id);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IEnumerable<AgendaView> GetAll()
        {
            return _scheduleService.GetAll();
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IActionResult Post(Schedule schedule)
        {
            try
            {
                return Ok(_scheduleService.Post(schedule));
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
        public IActionResult Edit(Schedule schedule)
        {
            try
            {
                return Ok(_scheduleService.Edit(schedule));
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
        public IActionResult Delete(int id)
        {
            try
            {
                _scheduleService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }
        #endregion
    }
}
