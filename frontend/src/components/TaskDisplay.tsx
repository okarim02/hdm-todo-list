import React from "react";
import { TextField, Select, MenuItem, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TaskDisplay = ({ task, handleEdit, handleDelete }) => (
  <>
    <TextField
      size="small"
      value={task.name}
      fullWidth
      sx={{ maxWidth: 350 }}
      disabled
    />
    <Select value={task.status} disabled sx={{ minWidth: 120 }}>
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="InProgress">In Progress</MenuItem>
      <MenuItem value="Completed">Completed</MenuItem>
    </Select>
    <Select value={task.priority} disabled sx={{ minWidth: 120 }}>
      <MenuItem value={1}>Important</MenuItem>
      <MenuItem value={2}>High</MenuItem>
      <MenuItem value={3}>Medium</MenuItem>
      <MenuItem value={4}>Banal</MenuItem>
    </Select>
    <Box>
      <IconButton color="primary" onClick={() => handleEdit(task)}>
        <Edit />
      </IconButton>
      <IconButton color="error" onClick={() => handleDelete(task.id)}>
        <Delete />
      </IconButton>
    </Box>
  </>
);

export default TaskDisplay;
