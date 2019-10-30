using System;
using System.Collections.Generic;

namespace PetClinic_Services.Domain.Models
{
    public partial class Countries
    {
        public Countries()
        {
            Customers = new HashSet<Customers>();
            Suppliers = new HashSet<Suppliers>();
        }

        public int CountryId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Customers> Customers { get; set; }
        public virtual ICollection<Suppliers> Suppliers { get; set; }
    }
}
