using bookservice.Models;

public class BookDto
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Image { get; set; }
}

public class BookInventoryDto
{
    public Guid Id { get; set; }
    public DateTime? LoanDate { get; set; }
    public required string User { get; set; }
}

public class BookDetailDto : BookDto
{
    public required List<BookInventoryDto> Inventories { get; set; }
}