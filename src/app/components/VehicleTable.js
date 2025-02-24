import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, Button } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

export default function VehicleTable({ vehicle, onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedVehicle, setSelectedVehicle] = React.useState(null);

  const handleMenuOpen = (event, vehicle) => {
    setAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVehicle(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
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
            <StyledTableCell>Make</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Register</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Cost Per Day</StyledTableCell>
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
              <StyledTableCell align="right">${vehicl.costPerDay}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="more"
                  aria-controls="vehicle-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, vehicl)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="vehicle-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleDelete(selectedVehicle._id)}>
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