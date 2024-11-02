"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import VehicleDetails from "../components/VehicleDetails";
import VehicleForm from "../components/VehicleForm";
// import Appbar from "../components/Appbar";
import AppbarTest from "../components/AppbarTest"
import Footer from "../components/Footer";
import VehicleTable from "../components/VehicleTable";
import VehicleCarousel from "../components/VehicleCarousel";

export default function Vehicle() {
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
        const res = await fetch("http://localhost:3546/api/vehicle", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="vehicle">
      {/* <Appbar /> */}
      <AppbarTest/>
      <div>
        {data.length > 0 ? (
          <VehicleCarousel vehicles={data} />
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>
      <div className="" style={{ textAlign: "center", padding: "50px" }}>
        <VehicleForm />
        {/* {data &&
          data.map((vehicle) => (
            <VehicleDetails key={vehicle._id} vehicle={vehicle} />
          ))} */}
        {data.length > 0 ? (
          <VehicleTable vehicle={data} />
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
