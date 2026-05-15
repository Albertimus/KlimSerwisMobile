using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceRequests.Queries.GetServiceRequestById;

public class Handler : IRequestHandler<Query, Response?>
{
    private readonly KlimSerwisDbContext _dbContext;

    public Handler(KlimSerwisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response?> Handle(
        Query request,
        CancellationToken cancellationToken)
    {
        return await _dbContext.ServiceRequests
            .Include(x => x.RequestStatus)
            .Where(x => x.Id == request.Id)
            .Select(x => new Response
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Status = x.RequestStatus!.Name,
                CreatedAt = x.CreatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}