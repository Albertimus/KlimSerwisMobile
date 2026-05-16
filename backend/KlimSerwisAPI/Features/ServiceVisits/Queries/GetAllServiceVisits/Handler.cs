using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceVisits.Queries.GetAllServiceVisits;

public class Handler : IRequestHandler<Query, List<Response>>
{
    private readonly KlimSerwisDbContext _dbContext;

    public Handler(KlimSerwisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Response>> Handle(
        Query request,
        CancellationToken cancellationToken)
    {
        return await _dbContext.ServiceVisits
            .Include(x => x.Customer)
            .Include(x => x.Technician)
            .Include(x => x.ServiceRequest)
            .Select(x => new Response
            {
                Id = x.Id,
                CustomerName = x.Customer!.FullName,
                TechnicianName = x.Technician!.FullName,
                RequestTitle = x.ServiceRequest!.Title,
                VisitDate = x.VisitDate,
                Status = x.Status,
                Notes = x.Notes
            })
            .ToListAsync(cancellationToken);
    }
}