using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.UserInterfaces
{
    public interface IUserService
    {
        Task<bool> userDoesExist(User user);
        Task<int> CreateUser(User user);
        Task<User> ValidateUser(string email, string password);
        Task<IReadOnlyList<User>> getUsersAsync();
        Task<User> getUserByIdAsync(int id);
        Task<int> UpdateUser(User user);
        Task<User> getUserByEmail(string email);
        string getResultMessage(int resultado);
        Task<int> deleteUser(int id); 
    }
}
