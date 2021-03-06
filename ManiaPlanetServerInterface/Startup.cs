﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManiaPlanetServerInterface.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ManiaPlanetServerInterface
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddTransient<LoginAttempt>();
            services.AddTransient<Cache.Cache>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                loggerFactory.AddConsole();
            } else
            {
                app.UseExceptionHandler("/Error.html");
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute("Default","{controller=Home}/{action=Index}");
            });

            app.UseFileServer();
        }
    }
}
