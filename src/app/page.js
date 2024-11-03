"use client";

import { useRouter } from "next/navigation";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import * as React from "react";
import Box from '@mui/material/Box';

export default function Home() {
  const router = useRouter();

  const goToAvailableVehicles = () => {
    router.push("/vehiclesavailables");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Appbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
      <p>show the available vehicles</p>
         <button
           onClick={goToAvailableVehicles}
           style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
         >
           go to vehicle available page
         </button>
      </Box>
      <Footer />
    </Box>
  );
}
