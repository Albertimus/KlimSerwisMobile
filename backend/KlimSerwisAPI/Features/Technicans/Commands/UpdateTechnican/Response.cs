namespace KlimSerwisAPI.Features.Technicians.Commands.UpdateTechnician;

public class Response
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string? Specialization { get; set; }
}