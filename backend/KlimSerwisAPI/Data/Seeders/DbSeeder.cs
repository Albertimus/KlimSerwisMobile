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
    }
}