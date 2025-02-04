import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  minHeight: "100vh",
})

const StyledFormControl = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  boxSizing: "border-box",
})

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#bbdefb",
    borderRadius: 3,
  },
})

const StyledAutoComplete = styled(Autocomplete)({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#bbdefb",
    borderRadius: 3,
  },
})

const StyledButton = styled(Button)({
  width: "100%",
  backgroundColor: "#01579b",
  color: "white",
  borderRadius: 6,
  padding: "12px 0",
  marginTop: "16px",
  "&:hover": {
    backgroundColor: "#014477",
  },
})

const StyledFormLabel = styled(FormLabel)({
  width: 500,
  height: 50,
  color: "white",
});

const UserForm = ({ onClose, fetchData }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const optionsRole = ["user", "admin"];

  useEffect(() => {
    const tokenStored = localStorage.getItem("token");
    if (!tokenStored) {
      router.push("/");
      return;
    }

    const decodedToken = jwtDecode(tokenStored);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    setToken(tokenStored);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Token not available");
      return;
    }

    const user = {
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
    };

    const response = await fetch(
      "https://rentcar-backend.onrender.com/api/user",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setFirstName("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setRole("");
      setError(null);
      fetchData();
      onClose();
    }
  };

  return (
    <StyledContainer>
      <form className="createUser" onSubmit={handleSubmit}>
        <StyledFormControl>
          <StyledFormLabel>Add New User</StyledFormLabel>
          <StyledTextField
            label="First Name"
            type="text"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <StyledTextField
            label="Last Name"
            type="text"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <StyledTextField
            label="Phone"
            type="text"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <StyledTextField
            label="Email"
            type="text"
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
          <StyledAutoComplete
            disablePortal
            options={optionsRole}
            value={role}
            onChange={(e, newValue) => setRole(newValue)}
            renderInput={(params) => <TextField {...params} label="Role" />}
          />
          <StyledButton type="submit">Add User</StyledButton>

          {error && <div className="error">{error}</div>}
        </StyledFormControl>
      </form>
    </StyledContainer>
  );
};

export default UserForm;
