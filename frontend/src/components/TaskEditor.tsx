import React from "react";
import { TextField, Select, MenuItem, IconButton } from "@mui/material";
import { Check, Cancel } from "@mui/icons-material";

const TaskEditor = ({
  editingTaskName,
  setEditingTaskName,
  editingTaskStatus,
  setEditingTaskStatus,
  editingTaskPriority,
  setEditingTaskPriority,
  handleSave,
  handleCancelEdit,
}) => (
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
      onChange={(e) => setEditingTaskPriority(Number(e.target.value))}
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
);

export default TaskEditor;
