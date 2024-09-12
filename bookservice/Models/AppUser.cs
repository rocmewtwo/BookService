using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class AppUser
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("password")]
    public required string Password { get; set; }

    [Column("role")]
    public required string Role { get; set; }

    [Column("username")]
    public required string Username { get; set; }

    public ICollection<Inventory>? Inventories { get; set; }
}