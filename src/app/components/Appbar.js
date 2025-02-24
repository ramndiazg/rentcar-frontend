import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Appbar() {
  const [token, setToken] = React.useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  const goToLogin = () => {
    router.push("/login");
  };
  const goToDashboard = () => {
    router.push("/dashboard");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1c65b3" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            RentCar App
          </Typography>
          {!token && (
            <Button 
              onClick={goToLogin} 
              color="inherit"
              sx={{ 
                backgroundColor: "white", 
                color: "#1c65b3", 
                fontWeight: "bold", 
                "&:hover": { backgroundColor: "#f5f5f5" } 
              }}
            >
              Login
            </Button>
          )}
          {token && (
            <Button 
              onClick={goToDashboard} 
              color="inherit"
              sx={{ 
                backgroundColor: "white", 
                color: "#1c65b3", 
                fontWeight: "bold", 
                "&:hover": { backgroundColor: "#f5f5f5" } 
              }}
            >
              Dashboard
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}