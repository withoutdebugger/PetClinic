using Microsoft.AspNetCore.Mvc;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Domain.Interfaces.Services
{
    public interface IPatientService
    {
        Patients GetById(int id);
        IEnumerable<SelectView> GetByCustomerId(int id);
        IEnumerable<Patients> GetAll();
        IEnumerable<SelectView> GetAllSelectView();
        Patients Post(Patients patient);
        void Delete(int id);
        Patients Edit(Patients patient);
    }
}
