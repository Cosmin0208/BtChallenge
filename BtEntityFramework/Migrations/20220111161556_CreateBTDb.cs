using Microsoft.EntityFrameworkCore.Migrations;

namespace BtEntityFramework.Migrations
{
    public partial class CreateBTDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Persoane",
                columns: table => new
                {
                    PersoanaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumePersoana = table.Column<string>(maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persoane", x => x.PersoanaId);
                });

            migrationBuilder.CreateTable(
                name: "Produse",
                columns: table => new
                {
                    ProdusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumeProdus = table.Column<string>(maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produse", x => x.ProdusId);
                });

            migrationBuilder.CreateTable(
                name: "Remuneratii",
                columns: table => new
                {
                    RemuneratieId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProdusId = table.Column<int>(nullable: false),
                    An = table.Column<int>(nullable: false),
                    Luna = table.Column<int>(nullable: false),
                    Remuneratie = table.Column<decimal>(type: "decimal(18, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Remuneratii", x => x.RemuneratieId);
                    table.ForeignKey(
                        name: "FK_Remuneratii_Produse",
                        column: x => x.ProdusId,
                        principalTable: "Produse",
                        principalColumn: "ProdusId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Vanzari",
                columns: table => new
                {
                    VanzareId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersoanaId = table.Column<int>(nullable: false),
                    ProdusId = table.Column<int>(nullable: false),
                    An = table.Column<int>(nullable: false),
                    Luna = table.Column<int>(nullable: false),
                    NrProduse = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vanzari", x => x.VanzareId);
                    table.ForeignKey(
                        name: "FK_Vanzari_Persoane",
                        column: x => x.PersoanaId,
                        principalTable: "Persoane",
                        principalColumn: "PersoanaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vanzari_Produse",
                        column: x => x.ProdusId,
                        principalTable: "Produse",
                        principalColumn: "ProdusId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Remuneratii_ProdusId",
                table: "Remuneratii",
                column: "ProdusId");

            migrationBuilder.CreateIndex(
                name: "IX_Vanzari_PersoanaId",
                table: "Vanzari",
                column: "PersoanaId");

            migrationBuilder.CreateIndex(
                name: "IX_Vanzari_ProdusId",
                table: "Vanzari",
                column: "ProdusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Remuneratii");

            migrationBuilder.DropTable(
                name: "Vanzari");

            migrationBuilder.DropTable(
                name: "Persoane");

            migrationBuilder.DropTable(
                name: "Produse");
        }
    }
}
