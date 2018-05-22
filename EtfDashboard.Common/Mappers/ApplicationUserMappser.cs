using EtfDashboard.DomainModel;
using EtfDashboard.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.Common.Mappers
{
   public  static class ApplicationUserMappser
    {
        public static ApplicationUserModel MapApplicationUserToApplicationUserModel(this ApplicationUser user)
        {
            if (user == null)
            {
                return null;
            }
            var newApplicationUserModel = new ApplicationUserModel
            {
                UserName=user.UserName,
                FirstName=user.FirstName,
                LastName=user.LastName,
                Password=user.PasswordHash,
                Email=user.Email,
                Id=user.Id
            };

            return newApplicationUserModel;
        }
    }
}
