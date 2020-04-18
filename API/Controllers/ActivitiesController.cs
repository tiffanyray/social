using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ActivitiesController : BaseController
  {
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetAll()
    {
        return await Mediator.Send(new GetAll.Query());
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Activity>> GetOne(Guid id)
    {
      return await Mediator.Send(new GetOne.Query{Id = id});
    }

    [HttpPost("create")]
    public async Task<ActionResult<Unit>> Post([FromBody]Post.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("update/{id}")]
    public async Task<ActionResult<Unit>> Put([FromBody]Put.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command{ Id = id });
    }
  }
}