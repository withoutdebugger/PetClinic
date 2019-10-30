using System;
using System.Collections.Generic;

namespace PetClinic_Services.Persistence.Modelss
{
    public partial class Suppliers
    {
        public int SupplierId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string BusinessName { get; set; }
        public string Address { get; set; }
        public string AddressNumber { get; set; }
        public string AddressBetween1 { get; set; }
        public string AddressBetween2 { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public int? CountryId { get; set; }
        public string ContactPhone { get; set; }
        public string ContactCellphone { get; set; }
        public string ContactEmail { get; set; }

        public virtual Countries Country { get; set; }
    }
}
