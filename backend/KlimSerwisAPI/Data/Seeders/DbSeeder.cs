using KlimSerwisAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Data.Seeders;

public static class DbSeeder
{
    public static async Task SeedAsync(KlimSerwisDbContext dbContext)
    {
        await dbContext.Database.MigrateAsync();

        if (!await dbContext.RequestStatuses.AnyAsync())
        {
            dbContext.RequestStatuses.AddRange(
                new RequestStatus { Name = "New" },
                new RequestStatus { Name = "In Progress" },
                new RequestStatus { Name = "Completed" },
                new RequestStatus { Name = "Cancelled" }
            );

            await dbContext.SaveChangesAsync();
        }

        if (!await dbContext.Customers.AnyAsync())
        {
            dbContext.Customers.AddRange(
                new Customer
                {
                    FullName = "Adam Nowak",
                    Email = "adam.nowak@example.com",
                    PhoneNumber = "+48 501 222 333",
                    Address = "ul. Klimatyczna 12, Kraków"
                },
                new Customer
                {
                    FullName = "Anna Kowalska",
                    Email = "anna.kowalska@example.com",
                    PhoneNumber = "+48 602 444 555",
                    Address = "ul. Serwisowa 8, Katowice"
                },
                new Customer
                {
                    FullName = "Marek Wiśniewski",
                    Email = "marek.wisniewski@example.com",
                    PhoneNumber = "+48 730 111 222",
                    Address = "ul. Chłodna 5, Warszawa"
                }
            );

            await dbContext.SaveChangesAsync();
        }

        if (!await dbContext.Technicians.AnyAsync())
        {
            dbContext.Technicians.AddRange(
                new Technician
                {
                    FullName = "Jakub Nowicki",
                    Email = "jakub.nowicki@example.com",
                    PhoneNumber = "+48 501 777 888",
                    Specialization = "Air conditioning installation"
                },
                new Technician
                {
                    FullName = "Mateusz Kowalczyk",
                    Email = "mateusz.kowalczyk@example.com",
                    PhoneNumber = "+48 602 333 444",
                    Specialization = "HVAC diagnostics"
                },
                new Technician
                {
                    FullName = "Damian Wiśniewski",
                    Email = "damian.wisniewski@example.com",
                    PhoneNumber = "+48 730 555 666",
                    Specialization = "Refrigeration systems"
                }
            );

            await dbContext.SaveChangesAsync();
        }

        var customers = await dbContext.Customers.ToListAsync();
        var technicians = await dbContext.Technicians.ToListAsync();
        var serviceRequests = await dbContext.ServiceRequests.ToListAsync();
        if (!await dbContext.ServiceVisits.AnyAsync()
            && customers.Count >= 3
            && technicians.Count >= 3
            && serviceRequests.Count >= 3)
        {
            dbContext.ServiceVisits.AddRange(
                new ServiceVisit
                {
                    CustomerId = customers[0].Id,
                    TechnicianId = technicians[0].Id,
                    ServiceRequestId = serviceRequests[0].Id,
                    VisitDate = DateTime.UtcNow.AddDays(1),
                    Status = "Scheduled",
                    Notes = "Initial diagnostics visit"
                },
                new ServiceVisit
                {
                    CustomerId = customers[1].Id,
                    TechnicianId = technicians[1].Id,
                    ServiceRequestId = serviceRequests[1].Id,
                    VisitDate = DateTime.UtcNow.AddDays(2),
                    Status = "Confirmed",
                    Notes = "Annual maintenance service"
                },
                new ServiceVisit
                {
                    CustomerId = customers[2].Id,
                    TechnicianId = technicians[2].Id,
                    ServiceRequestId = serviceRequests[2].Id,
                    VisitDate = DateTime.UtcNow.AddDays(3),
                    Status = "Pending",
                    Notes = "Leak inspection and repair"
                }
            );

            await dbContext.SaveChangesAsync();
        }
    }
}