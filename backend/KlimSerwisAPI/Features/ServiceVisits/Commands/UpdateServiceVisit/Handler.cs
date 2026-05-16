using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceVisits.Commands.UpdateServiceVisit;

public class Handler : IRequestHandler<Command, Response?>
{
    private readonly KlimSerwisDbContext _dbContext;

    public Handler(KlimSerwisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response?> Handle(
        Command request,
        CancellationToken cancellationToken)
    {
        var serviceVisit = await _dbContext.ServiceVisits
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (serviceVisit is null)
        {
            return null;
        }

        serviceVisit.CustomerId = request.CustomerId;
        serviceVisit.TechnicianId = request.TechnicianId;
        serviceVisit.ServiceRequestId = request.ServiceRequestId;
        serviceVisit.VisitDate = request.VisitDate;
        serviceVisit.Status = request.Status;
        serviceVisit.Notes = request.Notes;

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