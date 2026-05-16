using MediatR;

namespace KlimSerwisAPI.Features.ServiceVisits.Commands.UpdateServiceVisit;

public record Command(
    int Id,
    int CustomerId,
    int TechnicianId,
    int ServiceRequestId,
    DateTime VisitDate,
    string Status,
    string? Notes
) : IRequest<Response?>;