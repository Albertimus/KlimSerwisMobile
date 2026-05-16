using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.Customers.Queries.GetAllCustomers;

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
        return await _dbContext.Customers
            .Select(x => new Response
            {
                Id = x.Id,
                FullName = x.FullName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                Address = x.Address
            })
            .ToListAsync(cancellationToken);
    }
}