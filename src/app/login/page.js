"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, FormLabel, Modal, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Estilos para el modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// Estilos personalizados
const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const StyledButton = styled(Button)({
  width: "100%",
  height: "40px",
  borderRadius: "8px",
  backgroundColor: "#01579b",
  color: "white",
  "&:hover": {
    backgroundColor: "#013f6b",
  },
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true); // Controla si el modal está abierto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://rentcar-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Login fail");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      setError("Error in logging. Please verify your credentials.");
    }
  };

  const handleClose = () => setOpen(false); // Cierra el modal

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal"
      aria-describedby="login-form"
    >
      <Box sx={modalStyle}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: "center", mb: 3, color: "black" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <StyledTextField
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              InputProps={{
                style: { borderRadius: "8px" },
              }}
            />
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              InputProps={{
                style: { borderRadius: "8px" },
              }}
            />
            <StyledButton type="submit">Login</StyledButton>
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "error.main", textAlign: "center", mt: 2 }}
              >
                {error}
              </Typography>
            )}
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}