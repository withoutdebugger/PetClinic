using Microsoft.AspNetCore.Mvc;
using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetClinic_Services.Domain.Interfaces.Services
{
    public interface IScheduleService
    {
        Schedule GetById(int id);
        AgendaView Post(Schedule schedule);
        AgendaView Edit(Schedule schedule);
        IEnumerable<AgendaView> GetAll();
        void Delete(int id);

    }
}
