namespace TaskManager.Api.Data;

using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;

public class TaskDbContext : DbContext
{
    public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
    {

    }

    public DbSet<TodoTask> Tasks => Set<TodoTask>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure entity props here.
    }
}
