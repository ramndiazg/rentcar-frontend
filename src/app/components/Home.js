import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const VehicleCard = styled(Paper)(({ theme, image }) => ({
  position: "relative",
  height: "250px",
  width: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${image})`,
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(2),
  textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)",
  borderRadius: "10px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
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
    <Container sx={{ flexGrow: 1, padding: "20px" }}>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1c65b3" }}>
          Welcome to Our Vehicle Rental Service
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Find the perfect vehicle for your next adventure!
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vehicles by make"
          InputProps={{
            style: { backgroundColor: "white", color: "black" },
          }}
          InputLabelProps={{ style: { color: "gray" } }}
        />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1c65b3" }}>
          Available Vehicles
        </Typography>
        {filteredVehicles.length > 0 ? (
          <Grid container spacing={3}>
            {filteredVehicles.map((vehicle) => (
              <Grid key={vehicle._id} item xs={12} sm={6} md={4}>
                <VehicleCard image={vehicle.imageUrl}>
                  <Typography variant="h6">
                    {vehicle.make} {vehicle.model}
                  </Typography>
                  <Typography>Year: {vehicle.year}</Typography>
                  <Typography>Status: {vehicle.status}</Typography>
                  <Typography>Cost: {vehicle.costPerDay}</Typography>
                </VehicleCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No vehicles found matching your search.</Typography>
        )}
      </Box>
    </Container>
  );
}
