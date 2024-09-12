namespace BookBorrowService.Models
{
    public class InventoryDto
    {
        public Guid Id { get; set; }
        public required BookDto Book { get; set; }
        public DateTime? LoanDate { get; set; }
        public required string User { get; set; }
    }
}