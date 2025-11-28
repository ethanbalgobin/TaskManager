namespace TaskManager.Api.Endpoints;

using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.DTOs;

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
                return Results.NotFound($"No task found with the id {id}");
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
            var updated = await service.UpdateAsync(id, dto);

            if (updated == null)
            {
                return Results.NotFound($"No task exists with the id: {id}");
            }

            return Results.Ok(updated);
        });

        app.MapDelete("/tasks/{id:int}", async (ITaskService service, int id) =>
        {
            var deleted = await service.DeleteAsync(id);

            if (deleted == false)
            {
                return Results.NotFound($"No task exists with the id {id}");
            }

            return Results.Ok();
        });

        app.MapPut("/tasks/{id:int}/complete", async (ITaskService service, int id) =>
        {
            var updated = await service.MarkCompleteAsync(id);

            if (updated == false)
            {
                return Results.NotFound($"No task exists with the id {id}");
            }

            return Results.Ok();
        });

        return app;
    }
}