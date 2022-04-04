using Core.Entitites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class SistemaGenericoRHDbContext : DbContext
    {
        public SistemaGenericoRHDbContext(DbContextOptions<SistemaGenericoRHDbContext> options) : base(options)
        {
        }

        public DbSet<User> User {get; set; }
        public DbSet<Sexo> Sexo { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}

