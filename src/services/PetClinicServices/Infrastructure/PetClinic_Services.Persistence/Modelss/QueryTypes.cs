using System;
using System.Collections.Generic;

namespace PetClinic_Services.Persistence.Modelss
{
    public partial class QueryTypes
    {
        public int QueryTypes1 { get; set; }
        public string Description { get; set; }
        public double? EstimatedTime { get; set; }

        public virtual Schedule Schedule { get; set; }
    }
}
