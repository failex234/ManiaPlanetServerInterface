using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManiaPlanetServerInterface.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManiaPlanetServerInterface.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public string Post([FromBody]LoginAttempt loginAttempt)
        {
            if (loginAttempt.password == "0000") return "true";
            return "false";
        }
    }
}