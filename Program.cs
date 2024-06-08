using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Urls.Add("https://localhost:3000");

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapPost("/forward", async ([FromForm] IFormFile file) => {
   return "sent";
}).DisableAntiforgery();

app.Run();
