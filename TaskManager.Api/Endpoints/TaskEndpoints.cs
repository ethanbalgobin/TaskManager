namespace TaskManager.Api.Endpoints;

using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.DTOs;

public static class TaskEndpoints
{
    public static IEndpointRouteBuilder MapTaskEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/tasks", async (ITaskService service, bool? isComplete, string? search) =>
        {
            // TODO
            return Results.Ok();
        });

        app.MapGet("/tasks/{id:int}", async (ITaskService service, int id) =>
        {
            // TODO
            return Results.Ok();
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