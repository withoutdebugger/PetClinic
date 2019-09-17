using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace PetClinic.IdentityServer.Models
{
    public class Usuario:IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CellPhoneNumber { get; set; }
    }
}
