using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Inventory
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("book_id")]
    public Guid BookId { get; set; }

    [Column("user_id")]
    public Guid? UserId { get; set; }

    [Column("loan_date")]
    public DateTime? LoanDate { get; set; }

    public required Book Book { get; set; }

    public required AppUser AppUser { get; set; }
}