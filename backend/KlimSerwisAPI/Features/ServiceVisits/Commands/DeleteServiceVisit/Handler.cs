using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceVisits.Commands.DeleteServiceVisit;

public class Handler : IRequestHandler<Command, bool>
{
    private readonly KlimSerwisDbContext _dbContext;

    public Handler(KlimSerwisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> Handle(
        Command request,
        CancellationToken cancellationToken)
    {
        var serviceVisit = await _dbContext.ServiceVisits
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (serviceVisit is null)
        {
            return false;
        }

        _dbContext.ServiceVisits.Remove(serviceVisit);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}