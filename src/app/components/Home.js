import React, { useEffect, useState } from "react";
import { Box, Grid2, TextField, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const VehicleCard = styled(Paper)(({ theme, image }) => ({
  position: "relative",
  height: "200px",
  width: "430px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${image})`,
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(2),
  textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)",
}));

export default function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://rentcar-backend.onrender.com/api/vehiclesavailables",
          { method: "GET" }
        );
        if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);

  const filteredVehicles = data.filter((vehicle) =>
    vehicle.make.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Our Vehicle Rental Service
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Find the perfect vehicle for your next adventure!
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "20px", color: "white" }}>
        <Typography variant="h8" gutterBottom>
          Search vehicles by make
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            style: { backgroundColor: "white", color: "black" },
          }}
          InputLabelProps={{ style: { color: "gray" } }}
        />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Available Vehicles
        </Typography>
        {filteredVehicles.length > 0 ? (
          <Grid2 container spacing={2}>
            {filteredVehicles.map((vehicle) => (
              <Grid2 key={vehicle._id} item xs={12} sm={6} md={4}>
                <VehicleCard image={vehicle.imageUrl}>
                  <Typography variant="h6">
                    {vehicle.make} {vehicle.model}
                  </Typography>
                  <Typography>Year: {vehicle.year}</Typography>
                  <Typography>Status: {vehicle.status}</Typography>
                  <Typography>Cost: {vehicle.costPerDay}</Typography>
                </VehicleCard>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Typography>No vehicles found matching your search.</Typography>
        )}
      </Box>
    </Box>
  );
}
