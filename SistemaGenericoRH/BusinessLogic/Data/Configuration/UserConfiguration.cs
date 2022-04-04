using Core.Entitites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Correo).IsRequired().HasMaxLength(250);
            builder.Property(u => u.Usuario).IsRequired().HasMaxLength(250);
            builder.Property(u => u.Contraseña).IsRequired().HasMaxLength(250);
            builder.Property(u => u.Estatus).IsRequired().HasColumnType("bit");
            builder.Property(u => u.FechaCreacion).IsRequired().HasColumnType("datetime");
            builder.HasOne(s => s.Sexo).WithMany().HasForeignKey(u => u.SexoId);

        }
    }
}
