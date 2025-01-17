import { Check, Delete, Edit, Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { Task } from "../index";

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Pending");
  const [isCreating, setIsCreating] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [editingTaskStatus, setEditingTaskStatus] = useState("Pending");

  const handleFetchTasks = async () => {
    const response = await api.get("/tasks");
    if (response) {
      setTasks(response);
    }
  };

  const handleDelete = async (id: number) => {
    const response = await api.delete(`/tasks/${id}`);
    if (response !== false) {
      await handleFetchTasks();
    } else {
      console.error("Failed to delete task");
    }
  };

  const handleSave = async () => {
    console.log("Saving task id... IN PROGRESS", editingTaskId);
    try {
      if (!editingTaskName.trim() && !newTaskName.trim()) {
        console.error("Task name is required");
        return;
      }
      const response = editingTaskId
        ? await api.patch(`/tasks/${editingTaskId}`, {
            id: editingTaskId,
            name: editingTaskName.trim(),
            status: editingTaskStatus,
          })
        : await api.post("/tasks", {
            name: newTaskName.trim(),
            status: newTaskStatus,
          });

      if (response !== false) {
        setNewTaskName("");
        setNewTaskStatus("Pending");
        setIsCreating(false);
        setEditingTaskId(null);
        setEditingTaskName("");
        setEditingTaskStatus("Pending");
        await handleFetchTasks();
      } else {
        console.error("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    console.log("Editing in progress ... for the id of", task.id);
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
    setEditingTaskStatus(task.status);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskName("");
    setEditingTaskStatus("Pending");
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>
      <Box justifyContent="center" mt={5} flexDirection="column">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <Box
              key={task.id}
              display="flex"
              justifyContent="center"
              mt={2}
              gap={1}
              width="100%"
            >
              {editingTaskId === task.id ? (
                <>
                  <TextField
                    size="small"
                    value={editingTaskName}
                    onChange={(e) => setEditingTaskName(e.target.value)}
                    fullWidth
                    sx={{ maxWidth: 350 }}
                  />
                  <Select
                    value={editingTaskStatus}
                    onChange={(e) => setEditingTaskStatus(e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="InProgress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                  <IconButton
                    color="success"
                    disabled={!editingTaskName.trim()}
                    onClick={handleSave}
                  >
                    <Check />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancelEdit}>
                    <Cancel />
                  </IconButton>
                </>
              ) : (
                <>
                  <TextField
                    size="small"
                    value={task.name}
                    fullWidth
                    sx={{ maxWidth: 350 }}
                    disabled
                  />
                  <Select
                    value={task.status}
                    onChange={(e) =>
                      handleEdit({ ...task, status: e.target.value })
                    }
                    sx={{ minWidth: 120 }}
                    disabled
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="InProgress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(task)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
          ))
        ) : (
          <Typography variant="h6" textAlign="center">
            No tasks found
          </Typography>
        )}

        {isCreating ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
          >
            <TextField
              size="small"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter new task"
              sx={{ maxWidth: 350 }}
              onKeyPress={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            <Select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            <IconButton
              color="success"
              disabled={!newTaskName.trim()}
              onClick={handleSave}
            >
              <Check />
            </IconButton>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Button variant="outlined" onClick={() => setIsCreating(true)}>
              Add Task
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TodoPage;
