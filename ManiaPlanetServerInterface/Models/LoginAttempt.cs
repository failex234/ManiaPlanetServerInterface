using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ManiaPlanetServerInterface.Models
{
    public class LoginAttempt
    {
        [Required]
        [MaxLength(4)]
        [MinLength(4)]
        public string password { get; set; }
    }
}
