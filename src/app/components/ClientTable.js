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

export default function ClientTable({ client, onDelete }) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Are you sure you want to delete this client?");
    if (confirmDelete) {
      onDelete(id);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Clients</StyledTableCell>
            <StyledTableCell align="right">LastName</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {client.map((clt) => (
            <StyledTableRow key={clt._id}>
              <StyledTableCell component="th" scope="row">
                {clt.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{clt.lastName}</StyledTableCell>
              <StyledTableCell align="right">{clt.phone}</StyledTableCell>
              <StyledTableCell align="right">{clt.email}</StyledTableCell>
              <StyledTableCell align="right">{clt.address}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(clt._id)}
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
