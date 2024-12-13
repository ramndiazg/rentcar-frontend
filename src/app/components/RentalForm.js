import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  color: "#fff",
}));

export default function RentForm({
  selectedClient,
  selectedUser,
  selectedVehicle,
}) {
  const [rentDays, setRentDays] = useState(1);
  const [amount, setAmount] = useState(0);
  const [costPerDay, setCostPerDay] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (selectedVehicle) {
        try {
          const response = await fetch(`/api/vehicles/${selectedVehicle._id}`);
          if (!response.ok) throw new Error("Failed to fetch vehicle data");
          const data = await response.json();
          setCostPerDay(data.costPerDay);
        } catch (error) {
          console.error("Error fetching vehicle data:", error);
        }
      }
    };
    fetchVehicleData();
  }, [selectedVehicle]);

  useEffect(() => {
    if (rentDays && costPerDay) {
      setAmount(rentDays * costPerDay);
    }
  }, [rentDays, costPerDay]);

  const handleSubmit = async () => {
    if (!selectedUser || !selectedClient || !selectedVehicle) {
      alert("Please select a user, client and vehicle.");
      return;
    }

    const rentData = {
      userId: selectedUser.id,
      clientId: selectedClient._id,
      vehicleId: selectedVehicle._id,
      rentDays,
      amount,
      status: "active",
    };

    setLoading(true);
    try {
      const response = await fetch("/api/rents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rentData),
      });

      if (!response.ok) throw new Error("Failed to create rent");

      alert("Rent created successfully.");
    } catch (error) {
      console.error("Error creating rent:", error);
      alert("Failed to create rent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h6">Create Rent</Typography>
      <Typography>
        User ID: {selectedUser?.firstName || "Not selected"}
      </Typography>
      <Typography>
        Client ID: {selectedClient?.firstName || "Not selected"}
      </Typography>
      <Typography>
        Vehicle ID: {selectedVehicle?.make || "Not selected"}
      </Typography>
      <TextField
        label="Rent Days"
        type="number"
        value={rentDays}
        onChange={(e) => setRentDays(Number(e.target.value))}
        fullWidth
        InputProps={{
          inputProps: { min: 1 },
        }}
        sx={{ backgroundColor: "#fff", borderRadius: 1 }}
      />
      <Typography>Amount: {amount}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Rent"}
      </Button>
    </FormContainer>
  );
}
