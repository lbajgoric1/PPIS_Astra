using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Newtonsoft.Json;

[assembly: OwinStartup(typeof(EtfDashboard.WebAPI.Startup))]

namespace EtfDashboard.WebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var settings = new JsonSerializerSettings();
            var serializer = JsonSerializer.Create(settings);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            ConfigureAuth(app);
        }
    }
}
