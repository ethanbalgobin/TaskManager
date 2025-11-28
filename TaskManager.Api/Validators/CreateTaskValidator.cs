using FluentValidation;
using TaskManager.Api.DTOs;

namespace TaskManager.Api.Validators
{
    public class CreateTaskValidator : AbstractValidator<CreateTaskDto>
    {
        public CreateTaskValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Description is too long. Maximum length is 2000 characters.");

            RuleFor(x => x.DueDate)
                .GreaterThanOrEqualTo(DateTime.UtcNow).When(x => x.DueDate != null)
                .WithMessage("Due date must be in the future");
        }
    }
}
