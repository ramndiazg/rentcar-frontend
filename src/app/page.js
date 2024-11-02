"use client";

import { useRouter } from "next/navigation";
import Appbar from "./components/Appbar"
// import AppbarTest from "./components/AppbarTest"
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Home() {
  const router = useRouter();

  const goToAvailableVehicles = () => {
    router.push("/vehiclesavailables");
  };

  return (
    <React.Fragment className="Home" style={{ textAlign: "center", padding: "5px" }}>
      <Container >
      <Appbar />
      {/* <AppbarTest/> */}
        <Box sx={{ bgcolor: 'black', height: '100vh' }} />
        <p>show the available vehicles</p>
       <button
         onClick={goToAvailableVehicles}
         style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
       >
         go to vehicle available page
       </button>
      </Container>
    </React.Fragment>
  );
}
