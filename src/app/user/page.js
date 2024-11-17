"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../components/UserForm";
import AppbarTest from "../components/AppbarTest"
import Footer from "../components/Footer";
import UserTable from "../components/UserTable";

export default function User() {
  const [data, setData] = useState([]);
  const router = useRouter();
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
        const res = await fetch("https://rentcar-backend.onrender.com/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <AppbarTest/>
      <div className="" style={{ textAlign: "center", padding: "50px" }}>
        <UserForm />
        {data.length > 0 ? <UserTable user={data} /> : <p>No users found.</p>}
      </div>
      <Footer />
    </div>
  );
}
