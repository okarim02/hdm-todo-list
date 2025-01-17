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

import AddTask from "./AddTask";
import FilterBar from "./FilterBar";
import TaskList from "./TaskList";
import { TaskEditor } from "./TaskEditor";

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
      <FilterBar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <TaskList
        tasks={sortedTasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editingTaskId={editingTaskId}
        handleSave={handleSave}
        handleCancelEdit={handleCancelEdit}
        editingTaskName={editingTaskName}
        setEditingTaskName={setEditingTaskName}
        editingTaskStatus={editingTaskStatus}
        setEditingTaskStatus={setEditingTaskStatus}
        editingTaskPriority={editingTaskPriority}
        setEditingTaskPriority={setEditingTaskPriority}
      />
      <AddTask
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        newTaskName={newTaskName}
        setNewTaskName={setNewTaskName}
        newTaskStatus={newTaskStatus}
        setNewTaskStatus={setNewTaskStatus}
        newTaskPriority={newTaskPriority}
        setNewTaskPriority={setNewTaskPriority}
        handleSave={handleSave}
      />
    </Container>
  );
};

export default TodoPage;
