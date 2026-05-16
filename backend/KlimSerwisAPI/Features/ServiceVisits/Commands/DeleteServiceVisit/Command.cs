using MediatR;

namespace KlimSerwisAPI.Features.ServiceVisits.Commands.DeleteServiceVisit;

public record Command(int Id) : IRequest<bool>;