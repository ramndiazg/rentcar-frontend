"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, FormLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled("div")({
  textAlign: "center",
  padding: "50px",
});

const StyledFormControl = styled(FormControl)({
  alignItems: "center",
});

const StyledFormLabel = styled(FormLabel)({
  width: 500,
  height: 50,
  color: "white",
});

const StyledTextField = styled(TextField)({
  width: 500,
  height: 50,
  backgroundColor: "#bbdefb",
  borderRadius: 3,
  margin: "4px 8px",
});

const StyledButton = styled(Button)({
  width: 200,
  height: 50,
  backgroundColor: "#01579b",
  color: "white",
  borderRadius: 6,
  margin: "4px 8px",
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3546/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

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

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit}>
      <StyledFormControl>
      <StyledFormLabel>Login</StyledFormLabel>
      <StyledTextField
          label="Email"
          type="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
          <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <StyledButton
          type="submit"
        >
          Login
        </StyledButton>
        {error && <div className="error">{error}</div>}
        </StyledFormControl>
      </form>
    </StyledContainer>
  );
}
