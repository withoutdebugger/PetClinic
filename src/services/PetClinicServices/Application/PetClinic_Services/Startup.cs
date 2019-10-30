using PetClinic_Services.Application.Services;
using PetClinic_Services.Domain.Models;
using PetClinic_Services.Persistence.Data;
using PetClinic_Services.Swagger;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Linq;
using PetClinic_Services.Persistence.Models;

namespace PetClinic_Services
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
           
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddApiVersioning(c =>
            {
                c.DefaultApiVersion = new ApiVersion(1, 0);
                c.AssumeDefaultVersionWhenUnspecified = true;
                c.ApiVersionReader = new MediaTypeApiVersionReader();
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1.0", new Info
                {
                    Version = "v1.0",
                    Title = "ALG IDM API v1.0"
                });

                c.SwaggerDoc("v2.0", new Info
                {
                    Version = "v2.0",
                    Title = "ALG IDM API v2.0"
                });

                c.DocInclusionPredicate((docName, apiDesc) =>
                {

                    var actionVersions = apiDesc.ActionDescriptor.GetProperty<ApiVersionModel>();

                    return actionVersions.DeclaredApiVersions.Any(v => $"v{v.ToString()}" == docName);

                });


                c.OperationFilter<RemoveVersionParameters>();
                c.DocumentFilter<SetVersionInPaths>();

            });

            //Contexts
            services.AddScoped(typeof(petsContext), typeof(petsContext));
            services.AddScoped(typeof(IdentityContext), typeof(IdentityContext));

            //Services
            services.AddScoped(typeof(UserService), typeof(UserService));
            services.AddScoped(typeof(RoleService), typeof(RoleService));
            services.AddScoped(typeof(UserRoleService), typeof(UserRoleService));
            services.AddScoped(typeof(ClientService), typeof(ClientService));
            services.AddScoped(typeof(PatientService), typeof(PatientService));
            services.AddScoped(typeof(CountriesService), typeof(CountriesService));
            services.AddScoped(typeof(IdentificationsTypesService), typeof(IdentificationsTypesService));
            services.AddScoped(typeof(QueryTypesService), typeof(QueryTypesService));
            services.AddScoped(typeof(ScheduleService), typeof(ScheduleService));


            services.AddDbContext<petsContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            //Add identity framework
            services.AddDbContext<IdentityContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<IdentityContext>()
            .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength =4;
                options.Password.RequiredUniqueChars = 0;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });

        }   

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            var reactApp = Configuration.GetSection("Consumers").GetValue<string>("ReactApp");
            app.UseCors(builder => builder.WithOrigins(reactApp).AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "ALG IDM APIs v1.0");
                c.SwaggerEndpoint("/swagger/v2.0/swagger.json", "ALG IDM APIs v2.0");
            });
        }
    }
}
