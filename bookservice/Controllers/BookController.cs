using BookBorrowService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
[Authorize]
public class BooksController(ApplicationDbContext context) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks()
    {
        return await _context.Books.Select(b => new BookDto
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author,
            Image = b.Image
        }).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDetailDto>> GetBook(Guid id)
    {
        var inventories = await _context.Inventories
            .Include(i => i.Book)
            .Where(i => i.BookId == id)
            .Include(i => i.AppUser)
            .ToListAsync();

        var book = inventories.FirstOrDefault()?.Book;

        if (inventories == null || book == null)
        {
            return NotFound();
        }

        return new BookDetailDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Image = book.Image,
            Inventories = inventories.Select(i => new BookInventoryDto
            {
                Id = i.Id,
                LoanDate = i.LoanDate,
                User = i.AppUser?.Username ?? string.Empty
            }).ToList()
        };
    }

    [HttpPut("return")]
    public async Task<IActionResult> ReturnBook(UserInventoryDto userInventoryDto)
    {
        var inventory = await _context.Inventories
            .Include(i => i.Book)
            .FirstOrDefaultAsync(i => i.Id == userInventoryDto.InventoryId);

        if (inventory == null)
        {
            return NotFound();
        }

        if (inventory.UserId != userInventoryDto.UserId)
        {
            return Conflict();
        }

        inventory.UserId = null;
        inventory.LoanDate = null;
        await _context.SaveChangesAsync();

        return Accepted();
    }

    [HttpPut("borrow")]
    public async Task<IActionResult> BorrowBook(UserInventoryDto userInventoryDto)
    {
        var inventory = await _context.Inventories
            .Include(i => i.Book)
            .FirstOrDefaultAsync(i => i.Id == userInventoryDto.InventoryId);

        if (inventory == null)
        {
            return NotFound();
        }

        if (inventory.UserId != null)
        {
            return Conflict();
        }

        inventory.UserId = userInventoryDto.UserId;
        inventory.LoanDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Accepted();
    }
}