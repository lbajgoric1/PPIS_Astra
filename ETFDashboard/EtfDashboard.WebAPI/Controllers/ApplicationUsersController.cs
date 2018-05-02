using EtfDashboard.BLL.Interfaces;
using EtfDashboard.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EtfDashboard.WebAPI.Controllers
{
    public class ApplicationUsersController : ApiController
    {
        private IApplicationUserService _applicationUserService;
        public ApplicationUsersController(IApplicationUserService applicationUserService)
        {
            _applicationUserService = applicationUserService;
        }
        public IHttpActionResult Get()
        {
            var users = _applicationUserService.GetUsers();

            return Ok(users);
        }

        public IHttpActionResult Get(string id)
        {
            var user = _applicationUserService.GetApplicationUser(id);
            return Ok(user);
        }

        // POST: api/ApplicationUsers
        public void Post([FromBody]ApplicationUserModel newUser)
        {
            _applicationUserService.RegisterUser(newUser);
        }

        //// PUT: api/ApplicationUsers/5
        public IHttpActionResult Put(string id, [FromBody]ApplicationUserModel applicationUserModel)
        {
            return Ok(_applicationUserService.EditApplicationUserModel(id, applicationUserModel));
        }
    }
}
