using BtEntityFramework.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BtEntityFramework
{
    public partial class BTDbContext : DbContext
    {
        public BTDbContext()
        {
        }

        public BTDbContext(DbContextOptions<BTDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Persoane> Persoane { get; set; }
        public virtual DbSet<Produse> Produse { get; set; }
        public virtual DbSet<Remuneratii> Remuneratii { get; set; }
        public virtual DbSet<Vanzari> Vanzari { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\SQL2020;Database=BTDb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Persoane>(entity =>
            {
                entity.HasKey(e => e.PersoanaId);

                entity.Property(e => e.NumePersoana).HasMaxLength(128);
            });

            modelBuilder.Entity<Produse>(entity =>
            {
                entity.HasKey(e => e.ProdusId);

                entity.Property(e => e.NumeProdus).HasMaxLength(128);
            });

            modelBuilder.Entity<Remuneratii>(entity =>
            {
                entity.HasKey(e => e.RemuneratieId);

                entity.Property(e => e.Remuneratie).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Produs)
                    .WithMany(p => p.Remuneratii)
                    .HasForeignKey(d => d.ProdusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Remuneratii_Produse");
            });

            modelBuilder.Entity<Vanzari>(entity =>
            {
                entity.HasKey(e => e.VanzareId);

                entity.HasOne(d => d.Persoana)
                    .WithMany(p => p.Vanzari)
                    .HasForeignKey(d => d.PersoanaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Vanzari_Persoane");

                entity.HasOne(d => d.Produs)
                    .WithMany(p => p.Vanzari)
                    .HasForeignKey(d => d.ProdusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Vanzari_Produse");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }

    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<BTDbContext>
    {
        public BTDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../BtApp/appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<BTDbContext>();
            var connectionString = configuration.GetConnectionString("DatabaseConnection");
            builder.UseSqlServer(connectionString);
            return new BTDbContext(builder.Options);
        }
    }
}
