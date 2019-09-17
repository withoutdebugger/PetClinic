#pragma warning disable CS0246 // The type or namespace name 'Swashbuckle' could not be found (are you missing a using directive or an assembly reference?)
using Swashbuckle.AspNetCore.Swagger;
#pragma warning restore CS0246 // The type or namespace name 'Swashbuckle' could not be found (are you missing a using directive or an assembly reference?)
#pragma warning disable CS0246 // The type or namespace name 'Swashbuckle' could not be found (are you missing a using directive or an assembly reference?)
using Swashbuckle.AspNetCore.SwaggerGen;
#pragma warning restore CS0246 // The type or namespace name 'Swashbuckle' could not be found (are you missing a using directive or an assembly reference?)
using System.Linq;

namespace PetClinic_Services.Swagger
{
    public class RemoveVersionParameters : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            var versionParameter = operation.Parameters?.FirstOrDefault(p => p.Name == "version");
            if (versionParameter != null)
                operation.Parameters.Remove(versionParameter);
        }
    }
}
