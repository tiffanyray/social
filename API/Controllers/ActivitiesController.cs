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
    public async Task<ActionResult<List<ActivityDto>>> GetAll()
    {
        return await Mediator.Send(new GetAll.Query());
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ActivityDto>> GetOne(Guid id)
    {
      return await Mediator.Send(new GetOne.Query{Id = id});
    }

    [HttpPost("create")]
    public async Task<ActionResult<Unit>> Post([FromBody]Post.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("update/{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Unit>> Put([FromBody]Put.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("delete/{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command{ Id = id });
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult<Unit>> Attend(Guid id)
    {
      return await Mediator.Send(new Attend.Command{ Id = id });
    }

    [HttpDelete("{id}/attend")]
    public async Task<ActionResult<Unit>> Unattend(Guid id)
    {
      return await Mediator.Send(new Unattend.Command{ Id = id });
    }
  }
}