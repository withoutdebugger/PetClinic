using System;
using System.Collections.Generic;
using System.Text;

namespace PetClinic_Services.Domain.Dto
{
    public class AgendaView
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
