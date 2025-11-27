namespace TaskManager.Api.Endpoints;

using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.DTOs;
using System.Reflection.Metadata.Ecma335;

public static class TaskEndpoints
{
    public static IEndpointRouteBuilder MapTaskEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/tasks", async (ITaskService service, bool? isComplete, string? search) =>
        {
            var tasks = await service.GetAllAsync(isComplete, search);

            return Results.Ok(tasks);
        });

        app.MapGet("/tasks/{id:int}", async (ITaskService service, int id) =>
        {
            var task = await service.GetByIdAsync(id);

            if (task == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(task);
        });

        app.MapPost("/tasks", async (ITaskService service, CreateTaskDto dto) =>
        {
            var created = await service.CreateAsync(dto);
            return Results.Created($"tasks{created.Id}", created);
            
        });

        app.MapPut("/tasks/{id:int}", async (ITaskService service, int id, UpdateTaskDto dto) =>
        {
            // TODO
            return Results.Ok();
        });

        app.MapDelete("/tasks/{id:int}", async (ITaskService service, int id) =>
        {
            // TODO
            return Results.Ok();
        });

        app.MapPut("/tasks/{id:int}/complete", async (ITaskService service, int id) =>
        {
            // TODO
            return Results.Ok();
        });

        return app;
    }
}