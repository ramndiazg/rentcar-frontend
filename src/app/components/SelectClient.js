import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SelectClient({ clients, selectedClient, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="client-select-label">Client</InputLabel>
      <Select
        labelId="client-select-label"
        id="client-select"
        value={selectedClient?._id || ""}
        label="Client"
        onChange={(e) => {
          const selected = clients.find(clt => clt._id === e.target.value);
          onSelect(selected);
        }}
      >
        {clients.map((clt) => (
          <MenuItem key={clt._id} value={clt._id}>
            {clt.firstName} {clt.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}