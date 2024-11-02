import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RentCar App
          </Typography>
          {!token && (
            <Button onClick={goToLogin} color="inherit">
              Login
            </Button>
          )}
          {token && (
            <Button onClick={goToDashboard} color="inherit">
              Dashboard
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
