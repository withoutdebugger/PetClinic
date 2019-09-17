// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PetClinic.IdentityServer.Models
{
    public class LoginInputModel
    {
        [Required]
        [DisplayName("Usuario")]
        public string User { get; set; }
        [Required]
        [DisplayName("Contraseña")]
        public string Password { get; set; }
        public bool RememberLogin { get; set; }
        public string ReturnUrl { get; set; }
        public string Error { get; set; }
        public bool? LoginFailure { get; set; } = null;
    }
}