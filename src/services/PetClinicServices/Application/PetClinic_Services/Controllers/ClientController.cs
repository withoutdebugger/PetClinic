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
    public class ClientController : ControllerBase
    {
        #region Attributes
        private readonly ClientService _clientService;
        #endregion

        #region Constructor
        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }
        #endregion

        #region Methods Publics

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public Customers GetById(int id)
        {
            return _clientService.GetById(id);
        }


        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IEnumerable<Customers> GetAll()
        {
            return  _clientService.GetAll();
        }

        [HttpGet("SelectView")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IEnumerable<SelectView> GetAllSelectView()
        {
            return _clientService.GetAllSelectView();
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IActionResult Post(Customers client)
        {
            try
            {
                return Ok(_clientService.Post(client));
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
        public IActionResult Edit(Customers client)
        {
            try
            {
                return Ok(_clientService.Edit(client));
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
                _clientService.Delete(id);
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
