using KlimSerwisAPI.Data;
using KlimSerwisAPI.Models;
using MediatR;

namespace KlimSerwisAPI.Features.ServiceRequests.Commands.CreateServiceRequest;

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
        var serviceRequest = new ServiceRequest
        {
            Title = request.Title,
            Description = request.Description,
            RequestStatusId = request.RequestStatusId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.ServiceRequests.Add(serviceRequest);
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