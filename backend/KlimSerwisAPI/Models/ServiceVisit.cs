using System.ComponentModel.DataAnnotations;

namespace KlimSerwisAPI.Models;

public class ServiceVisit
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Customer is required")]
    public int CustomerId { get; set; }

    public Customer? Customer { get; set; }

    [Required(ErrorMessage = "Technican is required")]
    public int TechnicianId { get; set; }

    public Technician? Technician { get; set; }

    [Required(ErrorMessage = "Service request is required")]
    public int ServiceRequestId { get; set; }

    public ServiceRequest? ServiceRequest { get; set; }

    [Required(ErrorMessage = "Visit date is required")]
    [Display(Name = "Visit date")]
    public DateTime VisitDate { get; set; }

    [StringLength(100, ErrorMessage = "Max 100")]
    [Display(Name = "Visit status")]
    public string Status { get; set; } = "Scheduled";

    [StringLength(1000, ErrorMessage = "Max 1000")]
    [Display(Name = "Notes")]
    public string? Notes { get; set; }

    [DataType(DataType.DateTime)]
    [Display(Name = "Created at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}