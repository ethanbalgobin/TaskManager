using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using TaskManager.Api.Data;
using TaskManager.Api.Endpoints;
using TaskManager.Api.Services.Implementations;
using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.Validators;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithEnvironmentName()
    .Enrich.WithMachineName()
    .Enrich.WithProcessId()
    .Enrich.WithThreadId()
    .WriteTo.Console()
    .WriteTo.File("logs/logs.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// Database
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Services
builder.Services.AddScoped<ITaskService, TaskService>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// API Validator
builder.Services.AddValidatorsFromAssemblyContaining<CreateTaskValidator>();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

var app = builder.Build();

// Serilog
app.UseSerilogRequestLogging();

// Error Handling Middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI();

// Map endpoints
app.MapTaskEndpoints();

app.Run();
