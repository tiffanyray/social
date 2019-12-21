using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  public class ActivitiesController : ControllerBase
  {
      private readonly IMediator _mediator;
    public ActivitiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Route("/api/activities")]
    public async Task<ActionResult<List<Activity>>> GetAll()
    {
        return await _mediator.Send(new GetAll.Query());
    }

    [HttpGet]
    [Route("/api/activity/{id}")]
    public async Task<ActionResult<Activity>> GetOne(Guid id)
    {
      return await _mediator.Send(new GetOne.Query{Id = id});
    }

    [HttpPost]
    [Route("/api/createActivity")]
    public async Task<ActionResult<Unit>> Post([FromBody]Post.Command command)
    {
      return await _mediator.Send(command);
    }

    [HttpPut]
    [Route("/api/updateActivity")]
    public async Task<ActionResult<Unit>> Put([FromBody]Put.Command command)
    {
      return await _mediator.Send(command);
    }

    [HttpDelete]
    [Route("/api/deleteActivity/{id}")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await _mediator.Send(new Delete.Command{ Id = id });
    }
  }
}