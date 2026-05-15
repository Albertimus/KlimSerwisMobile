using MediatR;

namespace KlimSerwisAPI.Features.ServiceRequests.Commands.DeleteServiceRequest;

public record Command(int Id) : IRequest<bool>;