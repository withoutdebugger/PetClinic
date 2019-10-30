using System;
using System.Collections.Generic;

namespace PetClinic_Services.Persistence.Modelss
{
    public partial class Customers
    {
        public Customers()
        {
            Patients = new HashSet<Patients>();
            Schedule = new HashSet<Schedule>();
        }

        public int CustomerId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CustomerName { get; set; }
        public string SurName { get; set; }
        public string FullName { get; set; }
        public int? IdentificationTypeId { get; set; }
        public string IdentificationNumber { get; set; }
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
        public string ContactFacebook { get; set; }
        public string ContactTwitter { get; set; }
        public DateTime? BirthDate { get; set; }

        public virtual Countries Country { get; set; }
        public virtual IdentificationsTypes IdentificationType { get; set; }
        public virtual ICollection<Patients> Patients { get; set; }
        public virtual ICollection<Schedule> Schedule { get; set; }
    }
}
