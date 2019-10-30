using System;
using System.Collections.Generic;

namespace PetClinic_Services.Persistence.Modelss
{
    public partial class ProductsServicesCategories
    {
        public ProductsServicesCategories()
        {
            ProductsServices = new HashSet<ProductsServices>();
        }

        public int ProductServiceCategoryId { get; set; }
        public string Decription { get; set; }

        public virtual ICollection<ProductsServices> ProductsServices { get; set; }
    }
}
