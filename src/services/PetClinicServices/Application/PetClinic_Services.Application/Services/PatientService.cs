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
    public class PatientService : IPatientService
    {
        #region Atributtes
        private readonly petsContext _context;

        #endregion

        #region Constructor
        public PatientService(petsContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods Publics
        public Patients GetById(int id)
        {
            try
            {
                return _context.Patients
                                .Where(x => x.PatientId == id)
                                .Include(x=>x.Customer)
                                .Include(x=>x.Specie)
                                .FirstOrDefault();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

      

      
        public IEnumerable<Patients> GetAll()
        {
            try
            {
                return  _context.Patients
                                .Include(x => x.Specie)
                                .Include(x => x.Customer)
                                .ToList();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public IEnumerable<SelectView> GetByCustomerId(int id)
        {
            try
            {
                return (from c in _context.Patients.ToList()
                        where c.CustomerId == id
                       select new SelectView
                       {
                           Value = c.PatientId.ToString(),
                           Label = c.FullName
                       }).ToList();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public IEnumerable<SelectView> GetAllSelectView()
        {
            try
            {
                return (from c in _context.Patients.ToList()
                        select new SelectView
                        {
                            Value = c.PatientId.ToString(),
                            Label = c.FullName
                        }).ToList();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public Patients Post(Patients patient)
        {
            try
            {
                patient.CreatedDate = DateTime.Now.Date;
                _context.Patients.Add(patient);
                _context.SaveChanges();

                return GetById(patient.PatientId);
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
                _context.Patients.Remove(GetById(id));
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public Patients Edit(Patients patient)
        {
            try
            {
                _context.Patients.Update(patient);
                _context.SaveChanges();

                return GetById(patient.PatientId);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

     
        #endregion

    }
}
