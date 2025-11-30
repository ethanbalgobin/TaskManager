import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskMutations } from "../../hooks/useTaskMutations";
import { useToast } from "../../components/toast/useToast";

export default function TaskCreate() {
  const navigate = useNavigate();
  const { createTask } = useTaskMutations();
  const { addToast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleCreate() {
    createTask.mutate(
      {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      },
      {
        onSuccess: () => {
          addToast("Task created successfully!", "success");
          navigate("/tasks");
        },
        onError: () => {
          addToast("Failed to create task", "error");
        },
      }
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Create New Task</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>

        <label>
          Due Date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <button onClick={handleCreate} disabled={!title.trim()}>
          Create Task
        </button>

        <button onClick={() => navigate("/tasks")}>Cancel</button>
      </div>
    </div>
  );
}
