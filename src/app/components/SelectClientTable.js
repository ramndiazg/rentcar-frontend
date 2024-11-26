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

export default function SelectClientTable({ clients, onSelect }) {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCheckboxChange = (client) => {
    setSelectedClient(client);
    onSelect(client);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Select</StyledTableCell>
            <StyledTableCell>Clients</StyledTableCell>
            <StyledTableCell align="right">LastName</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((clt) => (
            <StyledTableRow key={clt._id}>
              <StyledTableCell>
                <Checkbox
                  checked={selectedClient?._id === clt._id}
                  onChange={() => handleCheckboxChange(clt)}
                  color="primary"
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {clt.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{clt.lastName}</StyledTableCell>
              <StyledTableCell align="right">{clt.phone}</StyledTableCell>
              <StyledTableCell align="right">{clt.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
