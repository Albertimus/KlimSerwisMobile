using KlimSerwisAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace KlimSerwisAPI.Features.Technicians.Commands.DeleteTechnician;

public class Handler : IRequestHandler<Command, bool>
{
    private readonly KlimSerwisDbContext _dbContext;

    public Handler(KlimSerwisDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> Handle(
        Command request,
        CancellationToken cancellationToken)
    {
        var technician = await _dbContext.Technicians
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (technician is null)
        {
            return false;
        }

        _dbContext.Technicians.Remove(technician);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }
}