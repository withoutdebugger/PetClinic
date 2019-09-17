using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetClinic.IdentityServer.Models
{
    public class UsuarioYRoles
    {
        public List<IdentityRole> listaDeRoles { get; set; }
        public Usuario usuario { get; set; }
    }
}
