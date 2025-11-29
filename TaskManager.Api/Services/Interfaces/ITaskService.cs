namespace TaskManager.Api.Services.Interfaces;

using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllAsync(bool? isComplete, string? search);

    Task<TaskResponseDto?> GetByIdAsync(int id);

    Task<TaskResponseDto> CreateAsync(CreateTaskDto dto);

    Task<TaskResponseDto?> UpdateAsync(int id, UpdateTaskDto dto);

    Task<bool> DeleteAsync(int id);

    Task<bool> MarkCompleteAsync(int id);

    Task<PagedResult<TaskResponseDto>> GetPagedAsync(
        int page,
        int pageSize,
        string? sortBy,
        string? direction,
        bool? isComplete,
        string? search);
}