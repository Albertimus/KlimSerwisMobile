using KlimSerwisAPI.Data;
using KlimSerwisAPI.Models;
using MediatR;

namespace KlimSerwisAPI.Features.Technicians.Commands.CreateTechnician;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly KlimSerwisDbContext _dbContext;

    public Handler(KlimSerwisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response> Handle(
        Command request,
        CancellationToken cancellationToken)
    {
        var technician = new Technician
        {
            FullName = request.FullName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Specialization = request.Specialization,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Technicians.Add(technician);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response
        {
            Id = technician.Id,
            FullName = technician.FullName,
            Email = technician.Email,
            PhoneNumber = technician.PhoneNumber,
            Specialization = technician.Specialization
        };
    }
}