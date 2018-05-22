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

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            base.Seed(context);

            // Dio gdje se radi dodavanje predefinisanih vrijednosti u bazi podataka.

            var roleStore = new RoleStore<IdentityRole>(context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            // Rola
            const string adminRole = "Administrator";
            if (!context.Roles.Any(r => r.Name == adminRole))
                roleManager.Create(new IdentityRole { Name = adminRole });

            //Dodavanje admina i rolu administratora istom
            var admin = CreateUser(context, userManager, "AVelija1", "Almedin", "Velija", "Pass4User!");
            userManager.AddToRole(admin.Id, adminRole);
        }

        private ApplicationUser CreateUser(ApplicationDbContext context, UserManager<ApplicationUser> userManager, string userName, string firstName, string lastName, string password)
        {
            var user = new ApplicationUser
            {
                FirstName = firstName,
                LastName = lastName,
                UserName = userName,
            };
            userManager.Create(user, password);

            return user;
        }

    }

}
