namespace TaskManager.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddTaskServices(this IServiceCollection services)
    {
        // Example: services.AddScoped<ITaskService, TaskService>();
        return services;
    }
}