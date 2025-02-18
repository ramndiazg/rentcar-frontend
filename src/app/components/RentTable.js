import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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

export default function RentTable({ rent }) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado");
    return;
  }
  const handleComplete = async (id) => {
    try {
      const response = await fetch("https://rentcar-backend.onrender.com/api/returnVehicle", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentId: id }),
      });

      if (response.ok) {
        alert("Renta completada exitosamente");
        window.location.reload();
      } else {
        alert("Error al completar la renta");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Hubo un problema con la solicitud");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Client</StyledTableCell>
            <StyledTableCell align="right">Vehicle</StyledTableCell>
            <StyledTableCell align="right">User</StyledTableCell>
            <StyledTableCell align="right">Rent Days</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rent
            .filter((rnt) => rnt.rentStatus !== "completed")
            .map((rnt) => (
              <StyledTableRow key={rnt._id}>
                <StyledTableCell component="th" scope="row">
                  {rnt.client}
                </StyledTableCell>
                <StyledTableCell align="right">{rnt.vehicle}</StyledTableCell>
                <StyledTableCell align="right">{rnt.user}</StyledTableCell>
                <StyledTableCell align="right">{rnt.rentDays}</StyledTableCell>
                <StyledTableCell align="right">{rnt.rentAmount}</StyledTableCell>
                <StyledTableCell align="right">{rnt.rentStatus}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleComplete(rnt._id)}
                  >
                    Completar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
