import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SelectUser({ users, selectedUser, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="user-select-label">User</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={selectedUser?._id || ""}
        label="User"
        onChange={(e) => {
          const selected = users.find(usr => usr._id === e.target.value);
          onSelect(selected);
        }}
      >
        {users.map((usr) => (
          <MenuItem key={usr._id} value={usr._id}>
            {usr.firstName} {usr.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}