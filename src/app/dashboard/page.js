"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Appbar from "../components/Appbar";
import AppbarTest from "../components/AppbarTest"
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

const StyledCard = styled(Card)({
  maxWidth: 500,
  width: "100%"
});

const StyledButton = styled(Button)({
  marginTop: 12,
  width: "150px"
});

const StyledStack = styled(Stack)({
  alignItems: "center"
});

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

  const goToPage = (path) => {
    router.push(path);
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
        const res = await fetch("http://localhost:3546/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      {/* <Appbar /> */}
      <AppbarTest/>
    <Container>
      <Box sx={{ textAlign: "center", marginY: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
      </Box>

      <StyledStack spacing={3}>
        <StyledCard variant="outlined">
          <CardContent>
            <Typography variant="h6">Vehicle</Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the vehicle page to manage vehicle information.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => goToPage("/vehicle")}
            >
              Go to Vehicle
            </StyledButton>
          </CardContent>
        </StyledCard>

        <StyledCard variant="outlined">
          <CardContent>
            <Typography variant="h6">Client</Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the client page to manage client details.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => goToPage("/client")}
            >
              Go to Client
            </StyledButton>
          </CardContent>
        </StyledCard>

        <StyledCard variant="outlined">
          <CardContent>
            <Typography variant="h6">User</Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the user page to manage user settings.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => goToPage("/user")}
            >
              Go to User
            </StyledButton>
          </CardContent>
        </StyledCard>
      </StyledStack>
    </Container>
    </div>
  );
}
