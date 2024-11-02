import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  marging: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Vehiclesgrid() {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3546/api/vehiclesavailables",
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {Array.isArray(data) &&
        data.map((vehicle) => (
          <Grid key={vehicle._id} container spacing={2}>
            <Grid size={1}>
              <Item>Make: {vehicle.make}</Item>
            </Grid>
            <Grid size={1}>
              <Item>Model: {vehicle.model}</Item>
            </Grid>
            <Grid size={1}>
              <Item>Color: {vehicle.color}</Item>
            </Grid>
            <Grid size={1}>
              <Item>Year: {vehicle.year}</Item>
            </Grid>
            <Grid size={1.5}>
              <Item>Status: {vehicle.status}</Item>
            </Grid>
          </Grid>
        ))}
    </Box>
  );
}
