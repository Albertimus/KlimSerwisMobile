using Azure;
using MediatR;

namespace KlimSerwisAPI.Features.ServiceRequests.Queries.GetAllServiceRequests;

public record Query : IRequest<List<Response>>;