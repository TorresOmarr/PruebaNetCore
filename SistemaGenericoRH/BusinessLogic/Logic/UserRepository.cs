using BusinessLogic.Data;
using Core.Entitites;
using Core.Interfaces;
using Core.Interfaces.UserInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Logic
{
    public class UserRepository : IUserRepository
    {
        private readonly SistemaGenericoRHDbContext _context;

        public UserRepository(SistemaGenericoRHDbContext context)
        {
            _context = context;
        }

        public async Task<User> getUserByIdAsync(int id)
        {
            return await _context.User
              .Include(u => u.Sexo)
              .Where(u => u.Id == id)
              .FirstOrDefaultAsync();
        }

        public async Task<User> getUserByEmail(string email)
        {
            return await _context.User
              .Include(u => u.Sexo)
              .Where(u => u.Correo == email)
              .FirstOrDefaultAsync();
        }
        public async Task<User> getUserByName(string userName)
        {
            return await _context.User
              .Include(u => u.Sexo)
              .Where(u => u.Usuario == userName)
              .FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<User>> getUsersAsync()
        {
            return await _context.User
                .Include(u => u.Sexo)
                .Where(u => u.Estatus == true)
                .ToListAsync();
        }

        public async Task<int> createUser(User user)
        {
            _context.User.Add(user);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> updateUser(User user)
        {
            var usuario = await getUserByIdAsync(user.Id);
            if (usuario == null)
            {
                return 0;
            };
            usuario.Correo = user.Correo;
            usuario.Usuario = user.Usuario;
            usuario.Contraseña = user.Contraseña;
            usuario.SexoId = user.SexoId;
            return await _context.SaveChangesAsync();
        }

        public async Task<User> getUserForLogin(string email, string password)
        {
            return await _context.User.Where(x => x.Correo == email && x.Contraseña == password).FirstOrDefaultAsync();
        }

        public async Task<int> deleteUser(User user)
        {
            user.Estatus = false;

            return await _context.SaveChangesAsync();
        }
    }
}
