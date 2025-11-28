using FluentValidation;
using TaskManager.Api.DTOs;

namespace TaskManager.Api.Validators
{
    public class UpdateTaskValidator : AbstractValidator<UpdateTaskDto>
    {
        public UpdateTaskValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title is too long. Maximum length is 200 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Description is too long. Maximum length is 2000 characters.");

            RuleFor(x => x.DueDate)
                .GreaterThanOrEqualTo(DateTime.UtcNow).When(x => x.DueDate != null)
                .WithMessage("Due date must be in the fututre.");
        }
    }
}
