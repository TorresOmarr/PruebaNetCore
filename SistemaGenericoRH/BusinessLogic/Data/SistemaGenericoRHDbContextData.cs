using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class SistemaGenericoRHDbContextData
    {
        public static async Task CargarDataAsync(SistemaGenericoRHDbContext context)
        {
            if (!context.Sexo.Any())
            {
                var sexoMasculino = new Sexo
                {
                    Descripcion = "Masculino",

                };

                var sexoFemenino = new Sexo
                {
                    Descripcion = "Femenino"
                };

                context.Sexo.Add(sexoMasculino);
                context.Sexo.Add(sexoFemenino);
                context.SaveChanges();



            }
            if (!context.User.Any())
            {
                var usuario = new User
                {
                    Correo = "omtorresr@gmail.com",
                    Usuario = "OmarTorres123",
                    Contraseña = "OmarTorres123$",
                    Estatus = true,
                    SexoId = context.Sexo.Where(s => s.Descripcion == "Masculino").Select(s => s.Id).FirstOrDefault(),
                    FechaCreacion = DateTime.Now,

                };

                context.User.Add(usuario);
                context.SaveChanges();

            }
        }

    }
}
