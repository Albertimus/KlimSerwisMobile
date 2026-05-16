using MediatR;

namespace KlimSerwisAPI.Features.ServiceVisits.Queries.GetAllServiceVisits;

public record Query : IRequest<List<Response>>;