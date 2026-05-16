using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KlimSerwisAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceVisitsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ServiceVisitsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(
            new KlimSerwisAPI.Features.ServiceVisits.Queries.GetAllServiceVisits.Query());

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        KlimSerwisAPI.Features.ServiceVisits.Commands.CreateServiceVisit.Command command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        KlimSerwisAPI.Features.ServiceVisits.Commands.UpdateServiceVisit.Command command)
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
            new KlimSerwisAPI.Features.ServiceVisits.Commands.DeleteServiceVisit.Command(id));

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
}
}