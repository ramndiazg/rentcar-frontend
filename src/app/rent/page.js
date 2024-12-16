"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import AppbarTest from "../components/AppbarTest";
import Footer from "../components/Footer";
import SelectClientTable from "../components/SelectClientTable";
import SelectUserTable from "../components/SelectUserTable";
import SelectVehicleTable from "../components/SelectVehicleTable";
import RentTable from "../components/RentTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RentForm from "../components/RentalForm";

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
          "https://rentcar-backend.onrender.com/api/vehicle",
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
          alignItems: "flex-start",
          margin: 4,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxHeight: "400px",
            overflowY: "auto",
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          {clientData.length > 0 ? (
            <SelectClientTable
              clients={clientData}
              onSelect={handleSelectClient}
            />
          ) : (
            <Typography>No clients found.</Typography>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            maxHeight: "400px",
            overflowY: "auto",
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          {vehicleData.length > 0 ? (
            <SelectVehicleTable
              vehicles={vehicleData}
              onSelect={handleSelectVehicle}
            />
          ) : (
            <Typography>No vehicles found.</Typography>
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            maxHeight: "400px",
            overflowY: "auto",
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          {userData.length > 0 ? (
            <SelectUserTable users={userData} onSelect={handleSelectUser} />
          ) : (
            <Typography>No users found.</Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">
          Selected Client: {selectedClient?.firstName || "None"}
        </Typography>
        <Typography variant="body1">
          Selected User: {selectedUser?.firstName || "None"}
        </Typography>
        <Typography variant="body1">
          Selected Vehicle: {selectedVehicle?.make || "None"}
        </Typography>
      </Box>
      <Box
        sx={{ margin: 2, backgroundColor: "#333", padding: 2, borderRadius: 2 }}
      >
        <RentForm
          selectedClient={selectedClient?._id || "None"}
          selectedUser={selectedUser?._id || "None"}
          selectedVehicle={selectedVehicle?._id || "None"}
        />
      </Box>
      <Box sx={{ margin: 2 }}>
        <RentTable rent={rentData} />
      </Box>
      <Footer />
    </div>
  );
}
