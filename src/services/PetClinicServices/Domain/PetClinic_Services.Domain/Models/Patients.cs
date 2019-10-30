using System;
using System.Collections.Generic;

namespace PetClinic_Services.Domain.Models
{
    public partial class Patients
    {
        public Patients()
        {
            Schedule = new HashSet<Schedule>();
        }

        public int PatientId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CustomerId { get; set; }
        public string FullName { get; set; }
        public int? Weight { get; set; }
        public int? Temperature { get; set; }
        public DateTime? BirthDate { get; set; }
        public int? SpecieId { get; set; }
        public string Sex { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Species Specie { get; set; }
        public virtual ICollection<Schedule> Schedule { get; set; }
    }
}
