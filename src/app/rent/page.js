"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import AppbarTest from "../components/AppbarTest";
import Footer from "../components/Footer";
import RentTable from "../components/RentTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RentForm from "../components/RentalForm";
import SelectClient from "../components/SelectClient";
import SelectUser from "../components/SelectUser";
import SelectVehicle from "../components/SelectVehicle";
import { Person, DirectionsCar } from "@mui/icons-material";

export default function Rent() {
  const [rentData, setRentData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const router = useRouter();

  const handleSelectClient = (client) => setSelectedClient(client);
  const handleSelectUser = (user) => setSelectedUser(user);
  const handleSelectVehicle = (vehicle) => setSelectedVehicle(vehicle);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      try {
        const clientRes = await fetch(
          "https://rentcar-backend.onrender.com/api/client",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setClientData(await clientRes.json());

        const vehicleRes = await fetch(
          "https://rentcar-backend.onrender.com/api/vehiclesavailables",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setVehicleData(await vehicleRes.json());

        const userRes = await fetch(
          "https://rentcar-backend.onrender.com/api/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserData(await userRes.json());

        const rentRes = await fetch(
          "https://rentcar-backend.onrender.com/api/rent",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRentData(await rentRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <AppbarTest />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
          alignItems: "stretch",
          margin: 4,
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: { md: "50%" },
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 4,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RentForm
            selectedClient={selectedClient?._id || "None"}
            selectedUser={selectedUser?._id || "None"}
            selectedVehicle={selectedVehicle?._id || "None"}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: { md: "50%" },
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 4,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <SelectClient
                clients={clientData}
                selectedClient={selectedClient}
                onSelect={handleSelectClient}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <SelectVehicle
                vehicles={vehicleData}
                selectedVehicle={selectedVehicle}
                onSelect={handleSelectVehicle}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <SelectUser
                users={userData}
                selectedUser={selectedUser}
                onSelect={handleSelectUser}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              marginTop: 2,
            }}
          >
            <Box sx={{ flex: 1, color: "black" }}>
              <Typography variant="body1" fontWeight="bold">
                <Person fontSize="small" sx={{ mr: 1 }} />
                Selected Client:
              </Typography>
              <Typography variant="body1">
                {selectedClient?.firstName || "None"}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, color: "black" }}>
              <Typography variant="body1" fontWeight="bold">
                <DirectionsCar fontSize="small" sx={{ mr: 1 }} />
                Selected Vehicle:
              </Typography>
              <Typography variant="body1">
                {selectedVehicle?.make || "None"}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, color: "black" }}>
              <Typography variant="body1" fontWeight="bold">
                <Person fontSize="small" sx={{ mr: 1 }} />
                Selected User:
              </Typography>
              <Typography variant="body1">
                {selectedUser?.firstName || "None"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ margin: 2 }}>
        <RentTable rent={rentData} />
      </Box>

      <Footer />
    </div>
  );
}