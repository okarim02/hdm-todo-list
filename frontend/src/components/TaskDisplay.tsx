import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TaskDisplay = ({ task, handleEdit, handleDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return "error"; // Important
      case 2:
        return "warning"; // High
      case 3:
        return "info"; // Medium
      case 4:
        return "default"; // Banal
      default:
        return "default";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "Pending":
        return { text: "Pending", color: "warning" };
      case "InProgress":
        return { text: "In Progress", color: "info" };
      case "Completed":
        return { text: "Completed", color: "success" };
      default:
        return { text: "Unknown", color: "default" };
    }
  };

  const statusInfo = formatStatus(task.status);

  return (
    <Card variant="outlined" sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">
            {task.name}
          </Typography>
          <Chip
            label={statusInfo.text}
            color={statusInfo.color}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Priority:
          </Typography>
          <Chip
            label={
              task.priority === 1
                ? "Important"
                : task.priority === 2
                ? "High"
                : task.priority === 3
                ? "Medium"
                : "Banal"
            }
            color={getPriorityColor(task.priority)}
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton
          color="primary"
          onClick={() => handleEdit(task)}
          aria-label="Edit task"
        >
          <Edit />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleDelete(task.id)}
          aria-label="Delete task"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskDisplay;
