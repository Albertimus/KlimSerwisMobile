using System.ComponentModel.DataAnnotations;

namespace KlimSerwisAPI.Models;

public class Technician
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Max 100")]
    [Display(Name = "Full name")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [StringLength(120, ErrorMessage = "Max 120")]
    [EmailAddress]
    [Display(Name = "Email address")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone number is required")]
    [StringLength(30, ErrorMessage = "Max 30")]
    [Display(Name = "Phone number")]
    public string PhoneNumber { get; set; } = string.Empty;

    [StringLength(100,ErrorMessage = "Max 100")]
    [Display(Name = "Specialization")]
    public string? Specialization { get; set; }

    [DataType(DataType.DateTime)]
    [Display(Name = "Created at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}