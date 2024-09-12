namespace bookservice.Models
{
    public class InventoryDto
    {
        public Guid Id { get; set; }
        public required BookDto Book { get; set; }
    }
}