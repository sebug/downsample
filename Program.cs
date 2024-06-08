using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Urls.Add("https://localhost:3000");

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapPost("/forward", async ([FromForm] IFormFile file) => {
    var payload = new StreamContent(file.OpenReadStream());
    using (var client = new HttpClient())
    {
        var response = await client.PostAsync("http://sebug.local/", payload);
        string responseString = await response.Content.ReadAsStringAsync();
        return responseString;
    }
}).DisableAntiforgery();

app.Run();
