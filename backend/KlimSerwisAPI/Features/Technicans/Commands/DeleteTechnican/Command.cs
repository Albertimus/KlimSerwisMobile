using MediatR;

namespace KlimSerwisAPI.Features.Technicians.Commands.DeleteTechnician;

public record Command(int Id) : IRequest<bool>;