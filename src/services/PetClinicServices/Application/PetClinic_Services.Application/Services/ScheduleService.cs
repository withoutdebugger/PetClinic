using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using PetClinic_Services.Persistence.Data;
using PetClinic_Services.Persistence.Models;

namespace PetClinic_Services.Application.Services
{
    public class ScheduleService : IScheduleService
    {
        #region Atributtes
        private readonly petsContext _context;

        #endregion

        #region Constructor
        public ScheduleService(petsContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods Publics
        public Schedule GetById(int id)
        {
            try
            {
                return _context.Schedule.Where(x => x.ScheduleId == id).FirstOrDefault();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }


        public IEnumerable<AgendaView> GetAll()
        {
            try
            {
                return (from schedule in _context.Schedule.ToList()
                        select new AgendaView {End= schedule.ScheduleDateEnd.Value,
                        Start= schedule.ScheduleDateStart.Value,
                        Id = schedule.ScheduleId,
                        Title = schedule.Notes}).ToList();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public AgendaView Post(Schedule schedule)
        {
            try
            {
                schedule.ScheduleDateStart = schedule.ScheduleDateStart.Value.AddHours(-3);
                schedule.ScheduleDateEnd = schedule.ScheduleDateEnd.Value.AddHours(-3);
                _context.Schedule.Add(schedule);
                _context.SaveChanges();

                var sched = (from schedules in _context.Schedule.ToList()
                       where schedules.ScheduleId == schedule.ScheduleId
                       select new AgendaView
                       {
                           End = schedule.ScheduleDateEnd.Value,
                           Start = schedule.ScheduleDateStart.Value,
                           Id = schedule.ScheduleId,
                           Title = schedule.Notes
                       }).FirstOrDefault();
                return sched;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public AgendaView Edit(Schedule schedule)
        {
            try
            {
                schedule.ScheduleDateStart = schedule.ScheduleDateStart.Value.AddHours(-3);
                schedule.ScheduleDateEnd = schedule.ScheduleDateEnd.Value.AddHours(-3);
                _context.Schedule.Update(schedule);
                _context.SaveChanges();

                return (from schedules in _context.Schedule.ToList()
                        where schedules.ScheduleId == schedule.ScheduleId
                        select new AgendaView
                        {
                            End = schedule.ScheduleDateEnd.Value,
                            Start = schedule.ScheduleDateStart.Value,
                            Id = schedule.ScheduleId,
                            Title = schedule.Notes
                        }).FirstOrDefault();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }
        public void Delete(int id)
        {
            try
            {
                _context.Schedule.Remove(GetById(id));
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

       

     
        #endregion

    }
}
