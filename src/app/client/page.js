"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientForm from "../components/ClientForm";
import AppbarTest from "../components/AppbarTest";
import Footer from "../components/Footer";
import ClientTable from "../components/ClientTable";

export default function Client() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const goToDashboard = () => {
    router.push("/dashboard");
  };
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
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
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://rentcar-backend.onrender.com/api/client/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        fetchData();
      } else {
        console.error("Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  return (
    <div>
      <AppbarTest />
      <div className="" style={{ textAlign: "center", padding: "50px" }}>
        <ClientForm />
        {data.length > 0 ? (
          <ClientTable client={data} onDelete={handleDelete} />
        ) : (
          <p>No clients found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
