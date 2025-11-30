import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useTaskMutations } from "../../hooks/useTaskMutations";
import { useNavigate } from "react-router-dom";
import type { Task } from "../../api/tasksApi";

export default function TaskList() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [sortBy, setSortBy] = useState("createdon");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data, isLoading, error } = useTasks(
    page,
    pageSize,
    sortDirection,
    sortBy
  );

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks.</p>;

  const tasks = data?.items ?? [];

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={`${sortBy}-${sortDirection}`}
          onChange={(e) => {
            const [newSortBy, newDirection] = e.target.value.split("-");
            setSortBy(newSortBy);
            setSortDirection(newDirection as "asc" | "desc");
          }}
        >
          {sortOptions.map((opt) => (
            <option
              key={`${opt.sortBy}-${opt.direction}`}
              value={`${opt.sortBy}-${opt.direction}`}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>

        <span>
          Page {page} of {data?.totalPages ?? 1}
        </span>

        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function TaskListItem({ task }: { task: Task }) {
  const navigate = useNavigate();
  const status = getStatus(task);
  const { deleteTask, completeTask } = useTaskMutations();

  return (
    <li className="task-item">
      <span className={`task-status-dot ${status}`} />

      <div className="task-info">
        <strong>{task.title}</strong>
        {task.description && (
          <p style={{ margin: "0.25rem 0", opacity: "0.8" }}>
            {task.description}
          </p>
        )}
      </div>

      <div className="task-actions">
        <button onClick={() => navigate(`/tasks/${task.id}/edit`)}>Edit</button>
        <button onClick={() => deleteTask.mutate(task.id)}>Delete</button>
        {!task.isComplete && (
          <button onClick={() => completeTask.mutate(task.id)}>
            Mark Complete
          </button>
        )}
      </div>
    </li>
  );
}

function getStatus(task: Task) {
  if (!task.dueDate) return "ok";

  const now = new Date();
  const due = new Date(task.dueDate);

  const daysLeft = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft <= 0) return "danger";
  if (daysLeft <= 3) return "warn";
  return "ok";
}

const sortOptions = [
  { label: "Title (A → Z)", sortBy: "title", direction: "asc" },
  { label: "Title (Z → A)", sortBy: "title", direction: "desc" },

  { label: "Due Date (Soonest First)", sortBy: "duedate", direction: "asc" },
  { label: "Due Date (Latest First)", sortBy: "duedate", direction: "desc" },

  { label: "Created (Oldest First)", sortBy: "createdon", direction: "asc" },
  { label: "Created (Newest First)", sortBy: "createdon", direction: "desc" },
];
