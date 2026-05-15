using MediatR;

namespace KlimSerwisAPI.Features.ServiceRequests.Queries.GetServiceRequestById;

public record Query(int Id) : IRequest<Response?>;