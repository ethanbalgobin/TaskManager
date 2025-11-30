import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TasksApi } from "../../api/tasksApi";
import { useTaskMutations } from "../../hooks/useTaskMutations";
import { useState, useEffect } from "react";

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = Number(id);

  const { updateTask, deleteTask, completeTask } = useTaskMutations();

  // Fetch existing task
  const { data, isLoading, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => TasksApi.getById(taskId),
    enabled: !!taskId,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Prefill form
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description ?? "");
      setDueDate(data.dueDate ? data.dueDate.substring(0, 10) : "");
    }
  }, [data]);

  if (isLoading) return <p>Loading task...</p>;
  if (error) return <p>Failed to load task.</p>;

  function handleSave() {
    updateTask.mutate(
      {
        id: taskId,
        dto: {
          title,
          description,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        },
      },
      {
        onSuccess: () => navigate("/tasks"),
      }
    );
  }

  function handleDelete() {
    deleteTask.mutate(taskId, {
      onSuccess: () => navigate("/tasks"),
    });
  }

  function handleComplete() {
    completeTask.mutate(taskId, {
      onSuccess: () => navigate("/tasks"),
    });
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Edit Task</h2>

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

        <button onClick={handleSave}>Save Changes</button>

        {!data.isComplete && (
          <button onClick={handleComplete}>Mark Complete</button>
        )}

        <button
          onClick={handleDelete}
          style={{ color: "red", marginTop: "1rem" }}
        >
          Delete Task
        </button>

        <button
          onClick={() => navigate("/tasks")}
          style={{ marginTop: "1rem" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
