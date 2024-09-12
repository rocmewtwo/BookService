using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class Book
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("author")]
    public required string Author { get; set; }

    [Column("image")]
    public required string Image { get; set; }

    [Column("title")]
    public required string Title { get; set; }

    [NotMapped]
    public Guid InventoryId { get; set; }

    public ICollection<Inventory>? Inventories { get; set; }
}