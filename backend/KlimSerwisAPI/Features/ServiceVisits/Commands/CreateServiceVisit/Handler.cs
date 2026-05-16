using KlimSerwisAPI.Data;
using KlimSerwisAPI.Models;
using MediatR;

namespace KlimSerwisAPI.Features.ServiceVisits.Commands.CreateServiceVisit;

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
        var serviceVisit = new ServiceVisit
        {
            CustomerId = request.CustomerId,
            TechnicianId = request.TechnicianId,
            ServiceRequestId = request.ServiceRequestId,
            VisitDate = request.VisitDate,
            Status = request.Status,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.ServiceVisits.Add(serviceVisit);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response
        {
            Id = serviceVisit.Id,
            CustomerId = serviceVisit.CustomerId,
            TechnicianId = serviceVisit.TechnicianId,
            ServiceRequestId = serviceVisit.ServiceRequestId,
            VisitDate = serviceVisit.VisitDate,
            Status = serviceVisit.Status,
            Notes = serviceVisit.Notes
        };
    }
}