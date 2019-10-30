using System;
using System.Collections.Generic;

namespace PetClinic_Services.Domain.Models
{
    public partial class IdentificationsTypes
    {
        public IdentificationsTypes()
        {
            Customers = new HashSet<Customers>();
        }

        public int IdentificationTypeId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Customers> Customers { get; set; }
    }
}
