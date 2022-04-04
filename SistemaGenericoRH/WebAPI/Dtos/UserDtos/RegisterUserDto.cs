using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos.UserDtos
{
    public class RegisterUserDto
    {
        public int Id { get; set; }
        [EmailAddress(ErrorMessage = "El Correo no es valido")]
        [Required]
        public string Correo { get; set; }
        [RegularExpression("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$", ErrorMessage = "El nombre de usuario debe ser Alfanumerico.")]
        [MinLength(7, ErrorMessage = "La longitud del usuario debe ser de al menos 7 caracteres")]
        [Required]
        public string Usuario { get; set; }
        [RegularExpression(@"^(?=.*[A - Za - z])(?=.*\d)(?=.*[@$!% *#?&])[A-Za-z\d@$!%*#?&]{10,25}$",
        ErrorMessage = "La contraseña debe contener al menos una minuscula, una mayuscula, un simbolo, un simbolo, un numero y la longirud debera ser de al menos 10 caracteres.")]
        [Required]
        public string Contraseña { get; set; }
        [Required(ErrorMessage ="El sexo es requerido.")]
        [Range(1,2, ErrorMessage = "Error en el dato sexo.")]
        public int SexoId { get; set; }
    }
}
