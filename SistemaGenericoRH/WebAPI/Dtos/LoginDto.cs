using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class LoginDto
    {
        public string Usuario { get; set; }
        public string Contraseña { get; set; }
    }
}
