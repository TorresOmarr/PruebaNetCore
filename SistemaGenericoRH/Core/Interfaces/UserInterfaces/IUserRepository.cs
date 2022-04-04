using Core.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.UserInterfaces
{
    public interface IUserRepository
    {
        Task<User> getUserByIdAsync(int id);
        Task<User> getUserByEmail(string email);
        Task<User> getUserByName(string userName);
        Task<IReadOnlyList<User>> getUsersAsync();
        Task<int> createUser(User user);
        Task<int> updateUser(User user);
        Task<User> getUserForLogin(string email, string password);
        Task<int> deleteUser(User user);
    }
}
