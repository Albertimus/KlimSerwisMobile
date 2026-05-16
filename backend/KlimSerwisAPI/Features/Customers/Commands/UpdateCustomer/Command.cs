using MediatR;

namespace KlimSerwisAPI.Features.Customers.Commands.UpdateCustomer;

public record Command(
    int Id,
    string FullName,
    string Email,
    string PhoneNumber,
    string? Address
) : IRequest<Response?>;