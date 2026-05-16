using MediatR;

namespace KlimSerwisAPI.Features.ServiceVisits.Commands.CreateServiceVisit;

public record Command(
    int CustomerId,
    int TechnicianId,
    int ServiceRequestId,
    DateTime VisitDate,
    string Status,
    string? Notes
) : IRequest<Response>;