using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MySys.Identity.Migrations
{
    public partial class add_os : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IssuedUtc",
                table: "RefreshTokens",
                newName: "DateIssued");

            migrationBuilder.AddColumn<string>(
                name: "DeviceId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OS",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "OS",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "DateIssued",
                table: "RefreshTokens",
                newName: "IssuedUtc");
        }
    }
}
