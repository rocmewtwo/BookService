using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Book> Books { get; set; }
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<Inventory> Inventories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Map model classes to lowercase table names
        modelBuilder.Entity<Book>().ToTable("book");
        modelBuilder.Entity<AppUser>().ToTable("app_user");
        modelBuilder.Entity<Inventory>().ToTable("inventory");

        modelBuilder.Entity<AppUser>()
            .HasMany(u => u.Inventories)
            .WithOne(i => i.AppUser)
            .HasForeignKey(i => i.UserId);

        modelBuilder.Entity<Book>()
            .HasMany(b => b.Inventories)
            .WithOne(i => i.Book)
            .HasForeignKey(i => i.BookId);
    }
}