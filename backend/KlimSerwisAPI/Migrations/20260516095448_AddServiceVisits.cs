using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KlimSerwisAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddServiceVisits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceVisits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    TechnicianId = table.Column<int>(type: "int", nullable: false),
                    ServiceRequestId = table.Column<int>(type: "int", nullable: false),
                    VisitDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceVisits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceVisits_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceVisits_ServiceRequests_ServiceRequestId",
                        column: x => x.ServiceRequestId,
                        principalTable: "ServiceRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceVisits_Technicians_TechnicianId",
                        column: x => x.TechnicianId,
                        principalTable: "Technicians",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceVisits_CustomerId",
                table: "ServiceVisits",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceVisits_ServiceRequestId",
                table: "ServiceVisits",
                column: "ServiceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceVisits_TechnicianId",
                table: "ServiceVisits",
                column: "TechnicianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceVisits");
        }
    }
}
