using MediatR;

namespace KlimSerwisAPI.Features.Customers.Queries.GetAllCustomers;

public record Query : IRequest<List<Response>>;