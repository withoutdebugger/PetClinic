using System;
using System.Collections.Generic;

namespace PetClinic_Services.Domain.Models
{
    public partial class ProductsServices
    {
        public ProductsServices()
        {
            ProductsServicesInventory = new HashSet<ProductsServicesInventory>();
        }

        public int ProductServiceId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ProductName { get; set; }
        public string Descripction { get; set; }
        public int? ProductServiceCategoryId { get; set; }
        public decimal? Price { get; set; }
        public string Brand { get; set; }
        public bool? ManageInventory { get; set; }
        public bool? IsActive { get; set; }

        public virtual ProductsServicesCategories ProductServiceCategory { get; set; }
        public virtual ICollection<ProductsServicesInventory> ProductsServicesInventory { get; set; }
    }
}
