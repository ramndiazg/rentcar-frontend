"use client";

import Appbar from "./components/Appbar";
import HomeComponent from "./components/Home";
import Footer from "./components/Footer";
import * as React from "react";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Appbar />
      <HomeComponent />
      <Footer />
    </Box>
  );
}
