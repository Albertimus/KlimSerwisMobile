using MediatR;

namespace KlimSerwisAPI.Features.Technicians.Commands.CreateTechnician;

public record Command(
    string FullName,
    string Email,
    string PhoneNumber,
    string? Specialization
) : IRequest<Response>;