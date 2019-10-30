using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using PetClinic_Services.Domain.Models;

namespace PetClinic_Services.Persistence.Models
{
    public partial class petsContext : DbContext
    {
        public petsContext()
        {
        }

        public petsContext(DbContextOptions<petsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<QueryTypes> QueryTypes { get; set; }

        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<IdentificationsTypes> IdentificationsTypes { get; set; }
        public virtual DbSet<Patients> Patients { get; set; }
        public virtual DbSet<ProductsServices> ProductsServices { get; set; }
        public virtual DbSet<ProductsServicesCategories> ProductsServicesCategories { get; set; }
        public virtual DbSet<ProductsServicesInventory> ProductsServicesInventory { get; set; }
        public virtual DbSet<Schedule> Schedule { get; set; }
        public virtual DbSet<Species> Species { get; set; }
        public virtual DbSet<Suppliers> Suppliers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });
            modelBuilder.Entity<QueryTypes>(entity =>
            {
                entity.HasKey(e => e.QueryTypes1);

                entity.Property(e => e.QueryTypes1).HasColumnName("QueryTypes");

                entity.Property(e => e.Description)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<Countries>(entity =>
            {
                entity.HasKey(e => e.CountryId);

                entity.Property(e => e.Description)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasKey(e => e.CustomerId);

                entity.Property(e => e.Address)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.AddressBetween1)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.AddressBetween2)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.AddressNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.ContactCellphone)
                    .HasColumnName("Contact_Cellphone")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ContactEmail)
                    .HasColumnName("Contact_Email")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ContactFacebook)
                    .HasColumnName("Contact_Facebook")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPhone)
                    .HasColumnName("Contact_Phone")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ContactTwitter)
                    .HasColumnName("Contact_Twitter")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.StateProvince)
                .HasMaxLength(150)
                .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.IdentificationNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SurName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_Customers_Countries");

                entity.HasOne(d => d.IdentificationType)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.IdentificationTypeId)
                    .HasConstraintName("FK_Customers_IdentificationsTypes");

            });

            modelBuilder.Entity<IdentificationsTypes>(entity =>
            {
                entity.HasKey(e => e.IdentificationTypeId);

                entity.Property(e => e.Description)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Patients>(entity =>
            {
                entity.HasKey(e => e.PatientId);

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FullName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Sex)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Patients)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Patients_Customers");

                entity.HasOne(d => d.Specie)
                    .WithMany(p => p.Patients)
                    .HasForeignKey(d => d.SpecieId)
                    .HasConstraintName("FK_Patients_Species");
            });

            modelBuilder.Entity<ProductsServices>(entity =>
            {
                entity.HasKey(e => e.ProductServiceId);

                entity.Property(e => e.Brand)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Descripction).IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(9, 2)");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.ProductServiceCategory)
                    .WithMany(p => p.ProductsServices)
                    .HasForeignKey(d => d.ProductServiceCategoryId)
                    .HasConstraintName("FK_ProductsServices_ProductsServicesCategories");
            });

            modelBuilder.Entity<ProductsServicesCategories>(entity =>
            {
                entity.HasKey(e => e.ProductServiceCategoryId);

                entity.Property(e => e.Decription)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ProductsServicesInventory>(entity =>
            {
                entity.HasKey(e => e.ProductServiceInventoryId);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.HasOne(d => d.ProductService)
                    .WithMany(p => p.ProductsServicesInventory)
                    .HasForeignKey(d => d.ProductServiceId)
                    .HasConstraintName("FK_ProductsServicesInventory_ProductsServices");
            });

            modelBuilder.Entity<Professionals>(entity =>
            {
                entity.HasKey(e => e.ProfessionalId);

                entity.Property(e => e.ContactCellphone)
                    .HasColumnName("Contact_Cellphone")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ContactEmail)
                    .HasColumnName("Contact_Email")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPhone)
                    .HasColumnName("Contact_Phone")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasMaxLength(10);

                entity.Property(e => e.FullName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProfessionalName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SurName)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.Property(e => e.ScheduleId).ValueGeneratedOnAdd();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.ProfessionalId).HasMaxLength(450);

                entity.Property(e => e.ScheduleDateEnd).HasColumnType("datetime");

                entity.Property(e => e.ScheduleDateStart).HasColumnType("datetime");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Schedule)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Schedule_Customers");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Schedule)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK_Schedule_Patients");

                entity.HasOne(d => d.Professional)
                    .WithMany(p => p.Schedule)
                    .HasForeignKey(d => d.ProfessionalId)
                    .HasConstraintName("FK_Schedule_AspNetUsers");

                entity.HasOne(d => d.ScheduleNavigation)
                    .WithOne(p => p.Schedule)
                    .HasForeignKey<Schedule>(d => d.QueryTypesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Schedule_QueryTypes");
            });

            modelBuilder.Entity<Species>(entity =>
            {
                entity.HasKey(e => e.SpecieId);

                entity.Property(e => e.Description)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Suppliers>(entity =>
            {
                entity.HasKey(e => e.SupplierId);

                entity.Property(e => e.Address)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.AddressBetween1)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.AddressBetween2)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.AddressNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessName)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                    entity.Property(e => e.StateProvince)
              .HasMaxLength(150)
              .IsUnicode(false);

                entity.Property(e => e.ContactCellphone)
                    .HasColumnName("Contact_Cellphone")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ContactEmail)
                    .HasColumnName("Contact_Email")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPhone)
                    .HasColumnName("Contact_Phone")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Suppliers)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_Suppliers_Countries");
            });
        }
    }
}
