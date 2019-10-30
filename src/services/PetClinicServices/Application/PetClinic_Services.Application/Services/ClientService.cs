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
    public class ClientService : IClientService
    {
        #region Atributtes
        private readonly petsContext _context;

        #endregion

        #region Constructor
        public ClientService(petsContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods Publics
        public Customers GetById(int id)
        {
            try
            {
                return _context.Customers
                                .Where(x => x.CustomerId == id)
                                .Include(x=>x.Country)
                                .Include(x=>x.IdentificationType)
                                .FirstOrDefault();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

      

      
        public IEnumerable<Customers> GetAll()
        {
            try
            {
                return  _context.Customers
                                .Include(x => x.Country)
                                .Include(x => x.IdentificationType)
                                .ToList();
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
                return (from c in _context.Customers.ToList()
                        select new SelectView
                        {
                            Value = c.CustomerId.ToString(),
                            Label = c.FullName
                        }).ToList();
                                
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public Customers Post(Customers client)
        {
            try
            {
                client.CreatedDate = DateTime.Now.Date;
                _context.Customers.Add(client);
                _context.SaveChanges();

                return GetById(client.CustomerId);
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
                _context.Customers.Remove(GetById(id));
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public Customers Edit(Customers client)
        {
            try
            {
                _context.Customers.Update(client);
                _context.SaveChanges();

                return GetById(client.CustomerId);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

     
        #endregion

    }
}
