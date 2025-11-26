namespace TaskManager.Api.Services.Interfaces;

using TaskManager.Api.DTOs;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllAsync(bool? isComplete, string? search);

    Task<TaskResponseDto?> GetByIdAsync(int id);

    Task<TaskResponseDto> CreateAsync(CreateTaskDto dto);

    Task<TaskResponseDto?> UpdateAsync(int id, UpdateTaskDto dto);

    Task<bool> DeleteAsync(int id);

    Task<bool> MarkCompleteAsync(int id);
}