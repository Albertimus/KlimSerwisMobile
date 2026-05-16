using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KlimSerwisAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TechniciansController : ControllerBase
{
    private readonly IMediator _mediator;

    public TechniciansController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(
            new KlimSerwisAPI.Features.Technicians.Queries.GetAllTechnicians.Query());

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        KlimSerwisAPI.Features.Technicians.Commands.CreateTechnician.Command command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        KlimSerwisAPI.Features.Technicians.Commands.UpdateTechnician.Command command)
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
            new KlimSerwisAPI.Features.Technicians.Commands.DeleteTechnician.Command(id));

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}