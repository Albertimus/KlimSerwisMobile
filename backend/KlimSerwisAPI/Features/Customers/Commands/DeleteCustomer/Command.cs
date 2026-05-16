using MediatR;

namespace KlimSerwisAPI.Features.Customers.Commands.DeleteCustomer;

public record Command(int Id) : IRequest<bool>;