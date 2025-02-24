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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01579b",
    color: theme.palette.common.white,
    fontWeight: "bold",
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedClient, setSelectedClient] = React.useState(null);

  const handleMenuOpen = (event, client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
      onDelete(id);
    }
    handleMenuClose();
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: 3 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
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
                  aria-label="more"
                  aria-controls="client-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, clt)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="client-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleDelete(selectedClient._id)}>
                    <DeleteIcon sx={{ mr: 1 }} /> Delete
                  </MenuItem>
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}