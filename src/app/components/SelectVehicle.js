import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SelectVehicle({ vehicles, selectedVehicle, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
      <Select
        labelId="vehicle-select-label"
        id="vehicle-select"
        value={selectedVehicle?._id || ""}
        label="Vehicle"
        onChange={(e) => {
          const selected = vehicles.find(vhc => vhc._id === e.target.value);
          onSelect(selected);
        }}
      >
        {vehicles.map((vhc) => (
          <MenuItem key={vhc._id} value={vhc._id}>
            {vhc.make} {vhc.model} ({vhc.year})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}