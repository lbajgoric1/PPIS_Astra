using EtfDashboard.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EtfDashboard.DAL;
using EtfDashboard.DomainModel;
using EtfDashboard.DTO;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using EtfDashboard.Common.Mappers;

namespace EtfDashboard.BLL.Services
{
    public class ApplicationUserService : IApplicationUserService
    {
        private ApplicationDbContext _context;

        public ApplicationUserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public void RegisterUser(ApplicationUserModel newUserModel)
        {
            try
            {
                var roleStore = new RoleStore<IdentityRole>(_context);
                var roleManager = new RoleManager<IdentityRole>(roleStore);
                var userStore = new UserStore<ApplicationUser>(_context);
                var userManager = new UserManager<ApplicationUser>(userStore);
                // Roles
                string newUserRole = newUserModel.Role;
                if (!_context.Roles.Any(r => r.Name == newUserRole))
                    roleManager.Create(new IdentityRole { Name = newUserModel.Role });
                //Adding users and roles to users
                var registeredUser = CreateOrRetrieveUser(_context, userManager, newUserModel.UserName, newUserModel.FirstName, newUserModel.LastName, newUserModel.Password, newUserModel.Email);
                if (registeredUser != null)
                {
                    userManager.AddToRole(registeredUser.Id, newUserRole);
                }
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e.Message);
            }
        }

        public ApplicationUser CreateOrRetrieveUser(ApplicationDbContext context, UserManager<ApplicationUser> userManager, string userName, string firstName, string lastName, string password, string email)
        {
            try
            {
                var user = context.Users.Where(x => x.UserName == userName).FirstOrDefault();
                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        UserName = userName,
                        Email = email
                    };
                    userManager.Create(user, password);
                }
                return user;
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e.Message);
            }
        }

        public ApplicationUserModel GetApplicationUser(string userID)
        {
            if (userID == "")
            {
                throw new ArgumentException("Invalid user id.");
            }
            var user = _context.Users.Where(x => x.Id == userID).FirstOrDefault();
            if (user == null)
            {
                throw new ArgumentException("User with given id not found.");
            }
            return user.MapApplicationUserToApplicationUserModel();
        }

        public ApplicationUserModel EditApplicationUserModel(string userID, ApplicationUserModel newApplicationUserModel)
        {
            try
            {
                var user = _context.Users.Where(x => x.Id == userID).FirstOrDefault();
                var userStore = new UserStore<ApplicationUser>(_context);
                var userManager = new UserManager<ApplicationUser>(userStore);

                if (user.MapApplicationUserToApplicationUserModel() == newApplicationUserModel)
                {
                    return newApplicationUserModel;
                }

                user.FirstName = newApplicationUserModel.FirstName;
                user.LastName = newApplicationUserModel.LastName;
                user.UserName = newApplicationUserModel.UserName;
                user.Email = newApplicationUserModel.Email;
                _context.SaveChanges();

                return user.MapApplicationUserToApplicationUserModel();
            }
            catch (Exception e)
            {
                throw new Exception("Error: " + e.Message);
            }
        }

        public ICollection<ApplicationUserModel> GetUsers()
        {
            var users = _context.Users.ToList();
            if (users == null)
            {
                throw new ArgumentException("Users not found.");
            }

            var usersModel = users
                                 .Select(x => x.MapApplicationUserToApplicationUserModel())
                                 .ToList();
            return usersModel;
        }
    }
}
