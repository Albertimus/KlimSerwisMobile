using MediatR;

namespace KlimSerwisAPI.Features.Customers.Commands.CreateCustomer;

public record Command(
    string FullName,
    string Email,
    string PhoneNumber,
    string? Address
) : IRequest<Response>;