import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SelectVehicleTable({ vehicles, onSelect }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleCheckboxChange = (vehicle) => {
    setSelectedVehicle(vehicle);
    onSelect(vehicle);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Select</StyledTableCell>
            <StyledTableCell>Vehicles</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vhc) => (
            <StyledTableRow key={vhc._id}>
              <StyledTableCell>
                <Checkbox
                  checked={selectedVehicle?._id === vhc._id}
                  onChange={() => handleCheckboxChange(vhc)}
                  color="primary"
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {vhc.make}
              </StyledTableCell>
              <StyledTableCell align="right">{vhc.model}</StyledTableCell>
              <StyledTableCell align="right">{vhc.year}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
