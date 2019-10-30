using System;
using System.Collections.Generic;

namespace PetClinic_Services.Persistence.Modelss
{
    public partial class Professionals
    {
        public int ProfessionalId { get; set; }
        public string CreatedDate { get; set; }
        public string ProfessionalName { get; set; }
        public string SurName { get; set; }
        public string FullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string ContactCellphone { get; set; }
        public bool? IsActive { get; set; }
    }
}
