namespace TaskManager.Api.Services.Implementations;

using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Services.Interfaces;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

public class TaskService : ITaskService
{
    private readonly TaskDbContext _context;

    private static TaskResponseDto MapToDto(TodoTask entity)
    {
        return new TaskResponseDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            IsComplete = entity.IsComplete,
            DueDate = entity.DueDate,
            CreatedOn = entity.CreatedOn,
            UpdatedOn = entity.UpdatedOn
        };
    }

    public TaskService(TaskDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskResponseDto>> GetAllAsync(bool? isComplete, string? search)
    {
        var query = _context.Tasks.AsQueryable();

        if (isComplete.HasValue)
        {
            query = query.Where(t => t.IsComplete == isComplete.HasValue);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(t => t.Title.Contains(search));
        }

        query = query.OrderBy(t => t.CreatedOn);

        var tasks = await query.ToListAsync();

        return tasks.Select(MapToDto).ToList();
    }

    public async Task<TaskResponseDto?> GetByIdAsync(int id)
    {
        var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
        {
            return null;
        }
        
        return MapToDto(task);
    }

    public async Task<TaskResponseDto> CreateAsync(CreateTaskDto dto)
    {
        // TODO
        var todo = new TodoTask
        {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate
        };

        _context.Add(todo);
        await _context.SaveChangesAsync();

        var result = MapToDto(todo);
        return result;

    }

    public async Task<TaskResponseDto?> UpdateAsync(int id, UpdateTaskDto dto)
    {
        var entity = await _context.Tasks.FindAsync(id);

        if (entity == null)
        {
            return null;
        }

        if (!string.IsNullOrEmpty(dto.Title))
        {
            entity.Title = dto.Title;
        }
        if (!string.IsNullOrEmpty(dto.Description))
        {
            entity.Description = dto.Description;
        }
        
        entity.IsComplete = dto.IsComplete;

        if (dto.DueDate != null)
        {
            entity.DueDate = dto.DueDate;
        }

        entity.UpdatedOn = DateTime.UtcNow;

        _context.Update(entity);
        await _context.SaveChangesAsync();
        
        return MapToDto(entity);
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