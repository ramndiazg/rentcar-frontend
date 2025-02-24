import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, Card, CardHeader, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Person, Phone, Email, Home, Payment, Star } from "@mui/icons-material";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

const StyledCard = styled(Card)({
  width: "100%",
  maxWidth: "500px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const StyledCardHeader = styled(CardHeader)({
  backgroundColor: "#01579b",
  color: "white",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const StyledAutoComplete = styled(Autocomplete)({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const StyledButton = styled(Button)({
  width: "100%",
  backgroundColor: "#01579b",
  color: "white",
  borderRadius: "8px",
  padding: "12px 0",
  marginTop: "16px",
  "&:hover": {
    backgroundColor: "#014477",
  },
});

const ClientForm = ({ onClose, fetchData }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState("");
  const optionsStatus = ["blocked", "regular", "premium"];
  const optionsPayment = ["cash", "credit card", "debit card"];

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

    const client = {
      firstName,
      lastName,
      phone,
      email,
      address,
      membershipStatus,
      preferredPaymentMethod,
    };

    const response = await fetch(
      "https://rentcar-backend.onrender.com/api/client",
      {
        method: "POST",
        body: JSON.stringify(client),
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
      setLastName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setMembershipStatus("");
      setPreferredPaymentMethod("");
      setError(null);
      fetchData();
      onClose();
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledCardHeader title="Add New Client" />
        <CardContent>
          <form className="createClient" onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <StyledTextField
                label="First Name"
                type="text"
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                InputProps={{
                  startAdornment: <Person fontSize="small" sx={{ mr: 1 }} />,
                }}
              />
              <StyledTextField
                label="Last Name"
                type="text"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                InputProps={{
                  startAdornment: <Person fontSize="small" sx={{ mr: 1 }} />,
                }}
              />
              <StyledTextField
                label="Phone"
                type="text"
                variant="outlined"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                InputProps={{
                  startAdornment: <Phone fontSize="small" sx={{ mr: 1 }} />,
                }}
              />
              <StyledTextField
                label="Email"
                type="text"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                InputProps={{
                  startAdornment: <Email fontSize="small" sx={{ mr: 1 }} />,
                }}
              />
              <StyledTextField
                label="Address"
                type="text"
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                InputProps={{
                  startAdornment: <Home fontSize="small" sx={{ mr: 1 }} />,
                }}
              />
              <StyledAutoComplete
                disablePortal
                options={optionsStatus}
                value={membershipStatus}
                onChange={(e, newValue) => setMembershipStatus(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Membership Status"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <Star fontSize="small" sx={{ mr: 1 }} />,
                    }}
                  />
                )}
              />
              <StyledAutoComplete
                disablePortal
                options={optionsPayment}
                value={preferredPaymentMethod}
                onChange={(e, newValue) => setPreferredPaymentMethod(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Preferred Payment Method"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <Payment fontSize="small" sx={{ mr: 1 }} />,
                    }}
                  />
                )}
              />
              <StyledButton type="submit">Add Client</StyledButton>
              {error && <Typography color="error">{error}</Typography>}
            </FormControl>
          </form>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default ClientForm;