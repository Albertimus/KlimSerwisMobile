using System.ComponentModel.DataAnnotations;

namespace KlimSerwisAPI.Models;

public class ServiceRequest
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required!")]
    [StringLength(100, ErrorMessage = "Max 100")]
    [Display(Name = "Service title")]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description is required!")]
    [StringLength(1000, ErrorMessage = "Max 1000")]
    [Display(Name = "Problem description")]
    public string Description { get; set;} = string.Empty;

    [Display(Name = "Request status")]
    public int RequestStatusId { get; set; }

    public RequestStatus? RequestStatus { get; set; }

    [DataType(DataType.DateTime)]
    [Display(Name = "Created at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}