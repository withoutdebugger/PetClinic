﻿
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

namespace PetClinic_Services.Swagger
{
    public class SetVersionInPaths : IDocumentFilter
    {
        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Paths = swaggerDoc.Paths
                .ToDictionary(
                    path => path.Key.Replace("v{version}", swaggerDoc.Info.Version),
                    path => path.Value
                );
        }
    }
}
