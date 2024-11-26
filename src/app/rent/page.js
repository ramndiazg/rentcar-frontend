"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import RentForm from "../components/RentForm";
import AppbarTest from "../components/AppbarTest";
import Footer from "../components/Footer";
import RentTable from "../components/RentTable";
import SelectClientTable from "../components/SelectClientTable";

export default function Rent() {
  const [rentData, setRentData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const router = useRouter();
  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };
  const goToDashboard = () => {
    router.push("/dashboard");
  };

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
        const res = await fetch(
          "https://rentcar-backend.onrender.com/api/rent",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();
        setRentData(result);
      } catch (error) {
        console.error("Error fetching rent data:", error);
      }
      try {
        const res = await fetch(
          "https://rentcar-backend.onrender.com/api/client",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();
        setClientData(result);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <AppbarTest />
      <div className="" style={{ textAlign: "center", padding: "50px" }}>
        {/* <RentForm /> */}
        {rentData.length > 0 ? (
          <RentTable rent={rentData} />
        ) : (
          <p>No rents found.</p>
        )}
      </div>
      <div style={{ textAlign: "center", padding: "50px" }}>
        {clientData.length > 0 ? (
          <SelectClientTable
            clients={clientData}
            onSelect={handleSelectClient}
          />
        ) : (
          <p>No clients found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
