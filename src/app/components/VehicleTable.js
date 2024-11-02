import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function VehicleTable({ vehicle }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Vehicles</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Chassis</StyledTableCell>
            <StyledTableCell align="right">Register</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Mileage</StyledTableCell>
            <StyledTableCell align="right">CostPerDay</StyledTableCell>
            <StyledTableCell align="right">LastServiceDate</StyledTableCell>
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
              <StyledTableCell align="right">{vehicl.chassis}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.register}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.status}</StyledTableCell>
              <StyledTableCell align="right">{vehicl.mileage}</StyledTableCell>
              <StyledTableCell align="right">
                {vehicl.costPerDay}
              </StyledTableCell>
              <StyledTableCell align="right">
                {vehicl.lastServiceDate}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
