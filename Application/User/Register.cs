using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
  public class Register
  {
    public class Command : IRequest<User>
    {
      public string DisplayName { get; set; }
      public string Username { get; set; }
      public string Email { get; set; }
      public string Password { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.DisplayName).NotEmpty();
        RuleFor(x => x.Username).NotEmpty();
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Command, User>
    {
      private readonly DataContext _context;
      private readonly IJwtGenerator _jwtGenerator;
      private readonly UserManager<AppUser> _userManager;

      public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
      {
        _userManager = userManager;
        _jwtGenerator = jwtGenerator;
        _context = context;
      }

      public async Task<User> Handle(Command request, CancellationToken cancellationToken)
      {
        // if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
        //     throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

        // if (await _context.Users.Where(x => x.Username == request.Username).AnyAsync())
        //     throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });


        var user = new AppUser
        {
            DisplayName = request.DisplayName,
            Email = request.Email,
            UserName = request.Username
        };

        var results = await _userManager.CreateAsync(user, request.Password);

        if (results.Succeeded)
        {
            return new User
            {
                DisplayName = user.DisplayName,
                Token = _jwtGenerator.CreateToken(user),
                Username = user.UserName,
                Image = null
            };
        }

        throw new Exception("Probleming creating user");
      }
    }
  }
}