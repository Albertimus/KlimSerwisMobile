using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.ServiceRequests.Commands.UpdateServiceRequest;

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
        var serviceRequest = await _dbContext.ServiceRequests
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (serviceRequest is null)
        {
            return null;
        }

        serviceRequest.Title = request.Title;
        serviceRequest.Description = request.Description;
        serviceRequest.RequestStatusId = request.RequestStatusId;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new Response
        {
            Id = serviceRequest.Id,
            Title = serviceRequest.Title,
            Description = serviceRequest.Description,
            RequestStatusId = serviceRequest.RequestStatusId,
            CreatedAt = serviceRequest.CreatedAt
        };
    }
}