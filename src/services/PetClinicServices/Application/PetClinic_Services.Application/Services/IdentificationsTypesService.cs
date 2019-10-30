using PetClinic_Services.Domain.Dto;
using PetClinic_Services.Domain.Interfaces.Services;
using PetClinic_Services.Domain.Models;
using PetClinic_Services.Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PetClinic_Services.Application.Services
{
    public class IdentificationsTypesService : IIdentificationsTypesService
    {
        #region Atributtes
        private readonly petsContext _context;

        #endregion

        #region Constructor
        public IdentificationsTypesService(petsContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods Publics

        public IEnumerable<SelectView> GetAll()
        {
            try
            {
                return (from c in _context.IdentificationsTypes.ToList()
                        select new SelectView
                        {
                            Value = c.IdentificationTypeId.ToString(),
                            Label = c.Description
                        }).ToList();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        #endregion
    }
}
