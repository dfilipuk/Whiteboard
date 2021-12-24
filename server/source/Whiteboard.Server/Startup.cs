using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Whiteboard.Server.Hubs;
using Whiteboard.Server.Services;

namespace Whiteboard.Server;

public class Startup
{
    private readonly string AllowAllCorsPolicy = "AllowAll";
    
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddHealthChecks();
        services.AddSignalR().AddMessagePackProtocol();

        services.AddSingleton<ICounter, Counter>();

        // https://docs.microsoft.com/en-us/aspnet/core/signalr/security?view=aspnetcore-6.0
        services.AddCors(options =>
            options.AddPolicy(AllowAllCorsPolicy, builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()));
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCors(AllowAllCorsPolicy);

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<DrawHub>("/hub/draw");

            endpoints.MapHealthChecks("/api/health");
            endpoints.MapGet("/{**path}", context =>
            {
                context.Response.Redirect("/api/health");
                return Task.CompletedTask;
            });
        });
    }
}

