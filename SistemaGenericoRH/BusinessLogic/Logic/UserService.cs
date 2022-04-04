using BusinessLogic.Utils;
using Core.Entitites;
using Core.Interfaces.UserInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Logic
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<int> CreateUser(User user)
        {
            
            var usuarioCorreoIgual = await _userRepository.getUserByEmail(user.Correo);
                if (usuarioCorreoIgual != null)
                    return 2;
            

            
            var usuarioMismoNombre = await _userRepository.getUserByName(user.Usuario);
                if (usuarioMismoNombre != null)
                    return 3;
          

            user.Contraseña = EncryptPassword.encryptPassword(user.Contraseña);
            user.Estatus = true;
            user.FechaCreacion = DateTime.Now;
            int resultado = await _userRepository.createUser(user);
            return resultado;
        }

        public async Task<int> UpdateUser(User user)
        {
            var usuarioDatos = await _userRepository.getUserByIdAsync(user.Id);
            if (usuarioDatos.Usuario  == user.Usuario && usuarioDatos.Correo == user.Correo 
                && user.Contraseña == user.Contraseña && usuarioDatos.SexoId == usuarioDatos.SexoId )
                return 4;

            if(usuarioDatos.Correo != user.Correo)
            {
                var usuarioCorreoIgual = await _userRepository.getUserByEmail(user.Correo);
                if(usuarioCorreoIgual != null)
                     return 2;             
            }

            if(usuarioDatos.Usuario != user.Usuario)
            {
                var usuarioMismoNombre = await _userRepository.getUserByName(user.Usuario);
                if (usuarioMismoNombre != null)
                    return 3;
            }         

           
            user.Contraseña = EncryptPassword.encryptPassword(user.Contraseña);       

            return await  _userRepository.updateUser(user);
        }


        public Task<User> GetUserByEmailOrUserNameAsync(string email)
        {
            return _userRepository.getUserByEmail(email);
        }



        public Task<User> GetUserByName(string userName)
        {
            return _userRepository.getUserByName(userName);
        }
        public Task<User> getUserByIdAsync(int id)
        {
            return _userRepository.getUserByIdAsync(id);
        }
        public Task<IReadOnlyList<User>> getUsersAsync()
        {
            return _userRepository.getUsersAsync();
        }       

        public async Task<bool> userDoesExist(User user)
        {
            var userExist = await _userRepository.getUserByEmail(user.Correo);
            return (userExist != null) ? true : false;
        }

        public Task<User> ValidateUser(string email, string password)
        {
            password = EncryptPassword.encryptPassword(password);
            return _userRepository.getUserForLogin(email, password);
        }

        public Task<User> getUserByEmail(string email)
        {
            return _userRepository.getUserByEmail(email);
        }

        public string getResultMessage(int resultado)
        {
            string mensaje = "";
            switch (resultado)
            {
                case 0:
                    mensaje = "No se pudo realizar el proceso";
                    break;
                case 1:
                    mensaje = "Proceso realizado con exito";
                    break;
                case 2:
                    mensaje = "El Correo ya esta siendo utilizado por otro usuario";
                    break;
                case 3:
                    mensaje = "El nombre ya esta siendo utilizado por otro usuario";
                    break;
                case 4:
                    mensaje = "Nada que actualizar";
                    break;
            }

            return mensaje;
        }

        public async Task<int> deleteUser(int id)
        {
            User user = await _userRepository.getUserByIdAsync(id);

            if (user == null)
                return 0;
            return await _userRepository.deleteUser(user);
            

        }
    }
}


