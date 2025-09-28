import React, { useEffect, useState } from "react";
import { Button, Checkbox, List, ListItem, ListItemText } from "@mui/material";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // ===== Fetch tasks =====
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! ${res.status}`);
        }

        const data = await res.json();

        // Ensure it's an array
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // ===== Delete task =====
  const deleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ===== Toggle completed =====
  const toggleTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const updated: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </Button>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
              />
              <ListItemText
                primary={task.title}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Tasks;
