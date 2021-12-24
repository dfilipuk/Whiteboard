using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Whiteboard.Server.Hubs;

namespace Whiteboard.Server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();
            services.AddSignalR().AddMessagePackProtocol();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<DrawHub>("/drawhub");

                endpoints.MapHealthChecks("/api/health");
                endpoints.MapGet("/{**path}", context =>
                {
                    context.Response.Redirect("/api/health");
                    return Task.CompletedTask;
                });
            });
        }
    }
}
