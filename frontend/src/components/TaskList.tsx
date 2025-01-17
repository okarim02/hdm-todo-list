import React from "react";
import { Box, Typography } from "@mui/material";
import TaskEditor from "./TaskEditor";
import TaskDisplay from "./TaskDisplay";

const TaskList = ({
  tasks,
  handleEdit,
  handleDelete,
  editingTaskId,
  handleSave,
  handleCancelEdit,
  editingTaskName,
  setEditingTaskName,
  editingTaskStatus,
  setEditingTaskStatus,
  editingTaskPriority,
  setEditingTaskPriority,
}) => {
  return (
    <Box justifyContent="center" mt={5} flexDirection="column">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            mt={2}
            gap={1}
          >
            {editingTaskId === task.id ? (
              <TaskEditor
                editingTaskName={editingTaskName}
                setEditingTaskName={setEditingTaskName}
                editingTaskStatus={editingTaskStatus}
                setEditingTaskStatus={setEditingTaskStatus}
                editingTaskPriority={editingTaskPriority}
                setEditingTaskPriority={setEditingTaskPriority}
                handleSave={handleSave}
                handleCancelEdit={handleCancelEdit}
              />
            ) : (
              <TaskDisplay
                task={task}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Box>
        ))
      ) : (
        <Typography variant="h6" textAlign="center">
          No tasks found
        </Typography>
      )}
    </Box>
  );
};

export default TaskList;
