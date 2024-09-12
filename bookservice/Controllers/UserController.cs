using BookBorrowService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("[controller]")]
[Authorize]
public class UserController(ApplicationDbContext context, IConfiguration configuration) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;
    private readonly IConfiguration _configuration = configuration;

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _context.AppUsers
            .FirstOrDefaultAsync(u => u.Username == loginDto.Username && u.Password == loginDto.Password);

        if (user == null)
        {
            return Unauthorized();
        }

        // Generate JWT token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? string.Empty);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            ]),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { Token = tokenString });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponseDto>> GetUser(Guid id)
    {
        var user = await _context.AppUsers
            .Include(u => u.Inventories!)
            .ThenInclude(i => i.Book)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        var userResponseDto = new UserResponseDto
        {
            Id = user.Id,
            Username = user.Username,
            Role = user.Role,
            Inventories = user.Inventories != null ? user.Inventories.Select(i => new InventoryDto
            {
                Id = i.Id,
                LoanDate = i.LoanDate,
                Book = new BookDto
                {
                    Id = i.Book.Id,
                    Title = i.Book.Title,
                    Author = i.Book.Author,
                    Image = i.Book.Image
                },
                User = user.Username
            }).ToList() : []
        };

        return userResponseDto;
    }
}