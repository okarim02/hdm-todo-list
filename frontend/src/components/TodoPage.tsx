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
  const [newTaskPriority, setNewTaskPriority] = useState(4);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [editingTaskStatus, setEditingTaskStatus] = useState("Pending");
  const [editingTaskPriority, setEditingTaskPriority] = useState(4);

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
            priority: editingTaskPriority,
          })
        : await api.post("/tasks", {
            name: newTaskName.trim(),
            status: newTaskStatus,
            priority: newTaskPriority,
          });

      if (response !== false) {
        setNewTaskName("");
        setNewTaskStatus("Pending");
        setNewTaskPriority(4);
        setIsCreating(false);
        setEditingTaskId(null);
        setEditingTaskName("");
        setEditingTaskStatus("Pending");
        setEditingTaskPriority(4);
        await handleFetchTasks();
      } else {
        console.error("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
    setEditingTaskStatus(task.status);
    setEditingTaskPriority(task.priority);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskName("");
    setEditingTaskStatus("Pending");
    setEditingTaskPriority(4);
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus && task.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField as keyof Task];
    const fieldB = b[sortField as keyof Task];
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={2} gap={2}>
        <Select
          value={filterStatus || ""}
          onChange={(e) => setFilterStatus(e.target.value || null)}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="InProgress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
        <Select
          value={sortField || ""}
          onChange={(e) => setSortField(e.target.value || null)}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">No Sorting</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </Select>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </Box>
      <Box justifyContent="center" mt={5} flexDirection="column">
        {Array.isArray(sortedTasks) && sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
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
                  <Select
                    value={editingTaskPriority}
                    onChange={(e) =>
                      setEditingTaskPriority(Number(e.target.value))
                    }
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value={1}>Important</MenuItem>
                    <MenuItem value={2}>High</MenuItem>
                    <MenuItem value={3}>Medium</MenuItem>
                    <MenuItem value={4}>Banal</MenuItem>
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
                  <Select
                    value={task.priority}
                    onChange={(e) =>
                      handleEdit({ ...task, priority: Number(e.target.value) })
                    }
                    sx={{ minWidth: 120 }}
                    disabled
                  >
                    <MenuItem value={1}>Important</MenuItem>
                    <MenuItem value={2}>High</MenuItem>
                    <MenuItem value={3}>Medium</MenuItem>
                    <MenuItem value={4}>Banal</MenuItem>
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
            <Select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(Number(e.target.value))}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={1}>Important</MenuItem>
              <MenuItem value={2}>High</MenuItem>
              <MenuItem value={3}>Medium</MenuItem>
              <MenuItem value={4}>Banal</MenuItem>
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
