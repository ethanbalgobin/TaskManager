namespace TaskManager.Api.DTOs
{
    public class UpdateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
