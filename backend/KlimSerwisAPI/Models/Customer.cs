using System.ComponentModel.DataAnnotations;

namespace KlimSerwisAPI.Models;

public class Customer
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Customer name is required")]
    [StringLength(100, ErrorMessage = "Max 100")]
    [Display(Name = "Full name")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [StringLength(120,ErrorMessage = "Max 120")]
    [EmailAddress]
    [Display(Name = "Email address")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone number is required")]
    [StringLength(30, ErrorMessage = "Max 30")]
    [Display(Name = "Phone number")]
    public string PhoneNumber { get; set; } = string.Empty;

    [StringLength(200, ErrorMessage = "Max 200")]
    [Display(Name = "Address")]
    public string? Address { get; set; }

    [DataType(DataType.DateTime)]
    [Display(Name = "Created at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}