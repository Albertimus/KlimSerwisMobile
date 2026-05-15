using KlimSerwisAPI.Data;
using KlimSerwisAPI.Features.ServiceRequests.Queries.GetAllServiceRequests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceRequests.Queries.GetAllServiceRequests;

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
        return await _dbContext.ServiceRequests.Include(x => x.RequestStatus)
        .Select(x => new Response
        {
            Id = x.Id,
            Title = x.Title,
            Description = x.Description,
            Status = x.RequestStatus!.Name,
            CreatedAt = x.CreatedAt,
        }).ToListAsync(cancellationToken);
    }
}