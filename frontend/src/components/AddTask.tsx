import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Check } from "@mui/icons-material";

const AddTask = ({
  isCreating,
  setIsCreating,
  newTaskName,
  setNewTaskName,
  newTaskStatus,
  setNewTaskStatus,
  newTaskPriority,
  setNewTaskPriority,
  handleSave,
}) =>
  isCreating ? (
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
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Button variant="outlined" onClick={() => setIsCreating(true)}>
        Add Task
      </Button>
    </Box>
  );

export default AddTask;
