using MediatR;

namespace KlimSerwisAPI.Features.Technicians.Commands.UpdateTechnician;

public record Command(
    int Id,
    string FullName,
    string Email,
    string PhoneNumber,
    string? Specialization
) : IRequest<Response?>;