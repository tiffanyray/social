using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<UserInfo> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserInfo>()
                .HasData(
                    new UserInfo { Id = 1, Name = "Name1" },
                    new UserInfo { Id = 2, Name = "Name2" },
                    new UserInfo { Id = 3, Name = "Name3" }
                );
        }

        public DbSet<Activity> Activities { get; set; }
        
    }
}
