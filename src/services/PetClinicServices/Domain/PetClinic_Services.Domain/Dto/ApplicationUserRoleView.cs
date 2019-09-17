using PetClinic_Services.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetClinic_Services.Domain.Dto
{
    public class ApplicationUserRoleView
    {
        public ApplicationUser User { get; set; }
        public List<string> Roles { get; set; }
    }
}
