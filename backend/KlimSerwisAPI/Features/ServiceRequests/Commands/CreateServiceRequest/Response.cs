namespace KlimSerwisAPI.Features.ServiceRequests.Commands.CreateServiceRequest;

public class Response
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int RequestStatusId { get; set; }

    public DateTime CreatedAt { get; set; }
}