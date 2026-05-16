namespace KlimSerwisAPI.Features.ServiceVisits.Queries.GetAllServiceVisits;

public class Response
{
    public int Id { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public string TechnicianName { get; set; } = string.Empty;

    public string RequestTitle { get; set; } = string.Empty;

    public DateTime VisitDate { get; set; }

    public string Status { get; set; } = string.Empty;

    public string? Notes { get; set; }
}