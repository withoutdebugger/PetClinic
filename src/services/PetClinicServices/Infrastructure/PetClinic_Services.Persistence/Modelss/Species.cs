using System;
using System.Collections.Generic;

namespace PetClinic_Services.Persistence.Modelss
{
    public partial class Species
    {
        public Species()
        {
            Patients = new HashSet<Patients>();
        }

        public int SpecieId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Patients> Patients { get; set; }
    }
}
