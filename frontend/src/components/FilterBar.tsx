import React from "react";
import { Box, Select, MenuItem } from "@mui/material";

const FilterBar = ({
  filterStatus,
  setFilterStatus,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => (
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
);

export default FilterBar;
