using MediatR;

namespace KlimSerwisAPI.Features.ServiceRequests.Commands.UpdateServiceRequest;

public record Command(
    int Id,
    string Title,
    string Description,
    int RequestStatusId
) : IRequest<Response?>;