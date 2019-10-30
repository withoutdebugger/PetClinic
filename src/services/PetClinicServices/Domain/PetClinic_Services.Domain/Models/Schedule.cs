using System;
using System.Collections.Generic;

namespace PetClinic_Services.Domain.Models
{
    public partial class Schedule
    {
        public int ScheduleId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ScheduleDateStart { get; set; }
        public DateTime? ScheduleDateEnd { get; set; }
        public int? CustomerId { get; set; }
        public int? PatientId { get; set; }
        public string ProfessionalId { get; set; }
        public string Notes { get; set; }
        public int? QueryTypesId { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Patients Patient { get; set; }
        public virtual AspNetUsers Professional { get; set; }
        public virtual QueryTypes ScheduleNavigation { get; set; }
    }
}
