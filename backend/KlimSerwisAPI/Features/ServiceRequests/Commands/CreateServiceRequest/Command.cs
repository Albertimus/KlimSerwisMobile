using MediatR;

namespace KlimSerwisAPI.Features.ServiceRequests.Commands.CreateServiceRequest;

public record Command(
    string Title,
    string Description,
    int RequestStatusId
) : IRequest<Response>;