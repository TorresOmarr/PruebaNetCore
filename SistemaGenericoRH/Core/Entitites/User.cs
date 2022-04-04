using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entitites
{
    public class User
    {
        public int Id { get; set; }      
        public string Correo { get; set; }       
        public string Usuario { get; set; }     
        public string Contraseña { get; set; }
        public bool Estatus { get; set; }
        public int SexoId { get; set; }
        public Sexo Sexo { get; set; }
        public DateTime FechaCreacion { get; set; }
            
    }
}
