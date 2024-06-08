var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Urls.Add("https://localhost:3000");

app.MapGet("/", () => "Hello World!");

app.Run();
