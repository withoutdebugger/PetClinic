using System;
using System.Collections.Generic;

namespace PetClinic_Services.Domain.Models
{
    public partial class ProductsServicesInventory
    {
        public int ProductServiceInventoryId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ProductServiceId { get; set; }
        public int? Quantity { get; set; }
        public int? QuantityMin { get; set; }
        public int? QuantityMax { get; set; }

        public virtual ProductsServices ProductService { get; set; }
    }
}
