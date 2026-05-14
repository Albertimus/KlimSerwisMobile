using System.ComponentModel.DataAnnotations;

namespace KlimSerwisAPI.Models;

public class RequestStatus
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Status name is required")]
    [StringLength(50, ErrorMessage = "Max 50")]
    [Display(Name = "Status name")]
    public string Name { get; set; } = string.Empty;

    public ICollection<ServiceRequest>? ServiceRequests { get; set; }
}