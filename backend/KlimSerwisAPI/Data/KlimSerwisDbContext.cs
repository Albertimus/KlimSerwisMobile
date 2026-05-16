using Microsoft.EntityFrameworkCore;
using KlimSerwisAPI.Models;

namespace KlimSerwisAPI.Data;

public class KlimSerwisDbContext : DbContext
{
    public KlimSerwisDbContext(DbContextOptions<KlimSerwisDbContext> options)
        : base(options)
        {}

    public DbSet<ServiceRequest> ServiceRequests => Set<ServiceRequest>();
    public DbSet<RequestStatus> RequestStatuses => Set<RequestStatus>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Technician> Technicians => Set<Technician>();
    public DbSet<ServiceVisit> ServiceVisits => Set<ServiceVisit>();
}