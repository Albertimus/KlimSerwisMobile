namespace KlimSerwisAPI.Features.ServiceVisits.Commands.CreateServiceVisit;

public class Response
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int TechnicianId { get; set; }

    public int ServiceRequestId { get; set; }

    public DateTime VisitDate { get; set; }

    public string Status { get; set; } = string.Empty;

    public string? Notes { get; set; }
}