namespace BookBorrowService.Models
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }

        public List<InventoryDto> Inventories { get; set; } = [];
    }
}