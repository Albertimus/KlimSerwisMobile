using KlimSerwisAPI.Features.ServiceRequests.Queries.GetAllServiceRequests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using KlimSerwisAPI.Features.ServiceRequests.Commands.CreateServiceRequest;
using KlimSerwisAPI.Features.ServiceRequests.Queries.GetServiceRequestById;
using KlimSerwisAPI.Features.ServiceRequests.Commands.UpdateServiceRequest;

namespace KlimSerwisAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ServiceRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
    var result = await _mediator.Send(new KlimSerwisAPI.Features.ServiceRequests.Queries.GetAllServiceRequests.Query());

    return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(KlimSerwisAPI.Features.ServiceRequests.Commands.CreateServiceRequest.Command command)
    {
    var result = await _mediator.Send(command);

    return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _mediator.Send(new KlimSerwisAPI.Features.ServiceRequests.Queries.GetServiceRequestById.Query(id));

        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update( int id, KlimSerwisAPI.Features.ServiceRequests.Commands.UpdateServiceRequest.Command command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        var result = await _mediator.Send(command);

        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _mediator.Send(
            new KlimSerwisAPI.Features.ServiceRequests.Commands.DeleteServiceRequest.Command(id));

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}