using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceRequests.Commands.DeleteServiceRequest;

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
        var serviceRequest = await _dbContext.ServiceRequests
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (serviceRequest is null)
        {
            return false;
        }

        _dbContext.ServiceRequests.Remove(serviceRequest);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}