using MediatR;

namespace KlimSerwisAPI.Features.Technicians.Queries.GetAllTechnicians;

public record Query : IRequest<List<Response>>;