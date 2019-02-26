using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ManiaPlanetServerInterface.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //Send user to the login page if user is not logged in
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
    }
}