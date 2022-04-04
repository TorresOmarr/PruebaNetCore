using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Correo { get; set; }
        public string Usuario { get; set; }
        public string SexoDescripcion { get; set; }
        public bool Estatus { get; set; } 
        public string Token { get; set; }
        
    }
}
