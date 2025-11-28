using TaskManager.Api.Data;
using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.Services.Implementations;
using TaskManager.Api.Endpoints;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerUI;
using Swashbuckle.AspNetCore.SwaggerGen;
using FluentValidation;
using TaskManager.Api.Validators;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<ITaskService, TaskService>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// API Validator
builder.Services.AddValidatorsFromAssemblyContaining<CreateTaskValidator>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Map endpoints
app.MapTaskEndpoints();

app.Run();

