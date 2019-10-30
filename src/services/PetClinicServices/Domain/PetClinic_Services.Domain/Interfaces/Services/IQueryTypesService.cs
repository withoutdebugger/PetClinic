using Microsoft.AspNetCore.Mvc;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Domain.Interfaces.Services
{
    public interface IQueryTypesService
    {
        IEnumerable<SelectView> GetAll();
    }
}
