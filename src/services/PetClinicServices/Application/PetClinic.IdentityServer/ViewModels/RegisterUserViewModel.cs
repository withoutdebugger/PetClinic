using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PetClinic.IdentityServer.ViewModels
{
    public class RegisterUserViewModel
    {
        [Required]
        public string Cuil { get; set; }
        //[EmailAddress] se comenta para que se pueda guardar el usuario con email nulo en caso de no haber ingresado
        //Se valida el tipo de mail desde WEB
        public string Email { get; set; }
    }
}
