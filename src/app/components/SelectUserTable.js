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

export default function SelectUserTable({ users, onSelect }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCheckboxChange = (user) => {
    setSelectedUser(user);
    onSelect(user);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Select</StyledTableCell>
            <StyledTableCell>Users</StyledTableCell>
            <StyledTableCell align="right">LastName</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((usr) => (
            <StyledTableRow key={usr._id}>
              <StyledTableCell>
                <Checkbox
                  checked={selectedUser?._id === usr._id}
                  onChange={() => handleCheckboxChange(usr)}
                  color="primary"
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {usr.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{usr.lastName}</StyledTableCell>
              <StyledTableCell align="right">{usr.phone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
