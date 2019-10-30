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
    public class CountriesController : ControllerBase
    {
        #region Attributes
        private readonly CountriesService _countriesService;
        #endregion

        #region Constructor
        public CountriesController(CountriesService countriesService)
        {
            _countriesService = countriesService;
        }
        #endregion

        #region Methods Publics

    
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [MapToApiVersion("1.0")]
        public IEnumerable<SelectView> GetAll()
        {
            return _countriesService.GetAll();
        }

      
        #endregion
    }
}
