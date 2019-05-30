using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore; // пространство имен EntityFramework

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Identity;
using a_srv.Services.Users;
using a_srv.Settings;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc.Authorization;
using Swashbuckle.AspNetCore.Swagger;
using a_srv.Services;
using a_srv.Options;
using a_srv.models;
using MySys.Identity.Data;
using MySys.Identity.Models;

namespace a_srv
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // получаем строку подключения из файла конфигурации
            string connection = Configuration.GetConnectionString("DefaultConnection");
            var connectionStringLogin = Configuration.GetConnectionString("LoginConnection");
            // добавляем контекст MobileContext в качестве сервиса в приложение
            services.AddDbContext<MyContext>(options =>
                options.UseSqlServer(connection));
            services.AddDbContext<MySysIdentityDbContext>(o => o.UseSqlServer(connectionStringLogin));

            services.AddOptions();
            services.Configure<IntegrationOptions>(Configuration.GetSection("IntegrationOptions"));

            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));

            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            var secretKey = Configuration.GetSection("JWTSettings:SecretKey").Value;
            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(
                    JwtBearerDefaults.AuthenticationScheme).
                    RequireAuthenticatedUser().
                    Build();
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],
                        ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                    };
                });

            services.AddIdentity<ApplicationUser, MyIdentityRole>(o =>
            {
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequiredLength = 6;
                o.Lockout.MaxFailedAccessAttempts = 100;

                o.SignIn.RequireConfirmedEmail = false;
                o.SignIn.RequireConfirmedPhoneNumber = false;

                o.User.RequireUniqueEmail = true;
            })
               .AddEntityFrameworkStores<MySysIdentityDbContext>()
               .AddDefaultTokenProviders();

            services.AddTransient<UserService>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "api",
                    template: "api/v1/{controller}/{id?}");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseMvc((routes) =>
            {
                routes.MapSpaFallbackRoute("default", new { controller = "Home", action = "Index" });
            });

        }
    }
}
