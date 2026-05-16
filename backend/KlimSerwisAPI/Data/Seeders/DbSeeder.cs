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
    }
}