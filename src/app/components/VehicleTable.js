import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function VehicleTable({ vehicle, onDelete }) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Are you sure you want to delete this vehicle?");
    if (confirmDelete) {
      onDelete(id);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Vehicles</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Register</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">CostPerDay</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicle.map((vehicl) => (
            <StyledTableRow key={vehicl._id}>
              <StyledTableCell component="th" scope="row">
                {vehicl.make}
              </StyledTableCell>
              <StyledTableCell align="right">{vehicl.model}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.color}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.year}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.register}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.status}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(vehicl._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
