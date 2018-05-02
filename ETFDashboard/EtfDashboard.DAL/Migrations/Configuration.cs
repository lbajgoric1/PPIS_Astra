namespace EtfDashboard.DAL.Migrations
{
    using DomainModel;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EtfDashboard.DAL.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EtfDashboard.DAL.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.
            base.Seed(context);
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            var roleStore = new RoleStore<IdentityRole>(context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            // Roles
            const string adminRole = "Administrator";
            if (!context.Roles.Any(r => r.Name == adminRole))
                roleManager.Create(new IdentityRole { Name = adminRole });


            //Adding users and roles to users
            var admin = CreateOrRetrieveUser(context, userManager, "AVelija1", "Almedin", "Velija", "Pass4User1!");
            userManager.AddToRole(admin.Id, adminRole);
            context.SaveChanges();


        }
        private ApplicationUser CreateOrRetrieveUser(ApplicationDbContext context, UserManager<ApplicationUser> userManager, string userName, string firstName, string lastName, string password)
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
