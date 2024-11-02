"use client";

import { useRouter } from "next/navigation";
import Vehiclesgrid from "../components/Vehiclesgrid";

export default function VehiclesAvailables() {
  const router = useRouter();
  const goToHome = () => {
    router.push("/");
  };

  return (
    <div>
      <h1>VehiclesAvailables page</h1>
      <p>welcome </p>
      <div className="vehicles">
        <Vehiclesgrid />
      </div>
      <p>click for go to home</p>
      <button
        onClick={goToHome}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        go to home page
      </button>
    </div>
  );
}
