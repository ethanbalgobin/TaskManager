namespace TaskManager.Api.Services.Implementations;

using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

public class TaskService : ITaskService
{
    private readonly TaskDbContext _context;

    public TaskService(TaskDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskResponseDto>> GetAllAsync(bool? isComplete, string? search)
    {
        // TODO: Implement filtering logic
        throw new NotImplementedException();
    }

    public async Task<TaskResponseDto?> GetByIdAsync(int id)
    {
        // TODO
        throw new NotImplementedException();
    }

    public async Task<TaskResponseDto> CreateAsync(CreateTaskDto dto)
    {
        // TODO
        throw new NotImplementedException();
    }

    public async Task<TaskResponseDto?> UpdateAsync(int id, UpdateTaskDto dto)
    {
        // TODO
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        // TODO
        throw new NotImplementedException();
    }

    public async Task<bool> MarkCompleteAsync(int id)
    {
        // TODO
        throw new NotImplementedException();
    }
}