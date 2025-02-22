import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Person, DirectionsCar, CalendarToday, AttachMoney } from "@mui/icons-material";

const FormContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  borderRadius: "12px",
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
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
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenStored = localStorage.getItem("token");
    if (!tokenStored) {
      router.push("/");
      return;
    }

    const decodedToken = jwtDecode(tokenStored);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    setToken(tokenStored);
  }, [router]);

  useEffect(() => {
    if (rentDays && costPerDay) {
      setAmount(rentDays * costPerDay);
    }
  }, [rentDays, costPerDay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token not available");
      return;
    }
    if (!selectedUser || !selectedClient || !selectedVehicle) {
      alert("Please select a user, client and vehicle.");
      return;
    }

    const rentData = {
      userId: selectedUser,
      clientId: selectedClient,
      vehicleId: selectedVehicle,
      rentDays,
      amount,
      status: "active",
    };

    setLoading(true);
    try {
      const response = await fetch(
        "https://rentcar-backend.onrender.com/api/rent",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rentData),
        }
      );

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
      <CardHeader
        title="Create Rent"
        sx={{ backgroundColor: "#01579b", color: "white" }}
      />
      <CardContent>
        <TextField
          label="Rent Days"
          type="number"
          value={rentDays}
          onChange={(e) => setRentDays(Number(e.target.value))}
          fullWidth
          InputProps={{
            inputProps: { min: 1 },
            startAdornment: <CalendarToday fontSize="small" sx={{ mr: 1 }} />,
          }}
          sx={{ mb: 2 }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? "Creating..." : "Create Rent"}
        </Button>
      </CardContent>
    </FormContainer>
  );
}