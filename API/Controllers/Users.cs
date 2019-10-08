using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
  [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        private readonly DataContext _context;

        public UsersController(ILogger<UsersController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserInfo>>> Get()
        {
            var values = await _context.Users.ToListAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfo>> Get (int id)
        {
            var value = await _context.Users.FindAsync(id);
            return Ok(value);
        }
    }
}
