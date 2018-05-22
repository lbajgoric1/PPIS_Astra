using EtfDashboard.DAL;
using EtfDashboard.DomainModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.TestDAL
{
    public class Program
    {

        static void Main(string[] args)
        {

            using (var context = new ApplicationDbContext())
            {
                var roleStore = new RoleStore<IdentityRole>(context);
                var roleManager = new RoleManager<IdentityRole>(roleStore);

                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new UserManager<ApplicationUser>(userStore);

                // Roles
                const string adminRole = "Manager";
                if (!context.Roles.Any(r => r.Name == adminRole))
                    roleManager.Create(new IdentityRole { Name = adminRole });


                //Adding users and roles to users
                var admin = CreateOrRetrieveUser(context, userManager, "AVelija2", "Almedin1", "Velija1", "Pass4User1!");
                userManager.AddToRole(admin.Id, adminRole);
            }
        }


        private static  ApplicationUser CreateOrRetrieveUser(ApplicationDbContext context, UserManager<ApplicationUser> userManager, string userName, string firstName, string lastName, string password)
        {
            var user = context.Users.Where(x => x.UserName == userName).FirstOrDefault();
            if (user == null)
            {
                user = new ApplicationUser
                {
                    FirstName = firstName,
                    LastName = lastName,
                    UserName = userName,
                };
                userManager.Create(user, password);
            }

            return user;
        }
    }

   
}
