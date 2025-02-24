import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import { styled } from "@mui/system";


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

const VehicleForm = ({ onClose, fetchData }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [chassis, setChassis] = useState("");
  const [register, setRegister] = useState("");
  const [mileage, setMileage] = useState("");
  const [status, setStatus] = useState("");
  const [costPerDay, setCostPerDay] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const optionsStatus = ["available", "in use", "maintenance"];

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

    const vehicle = {
      make,
      model,
      color,
      year,
      chassis,
      register,
      mileage,
      status,
      costPerDay,
      lastServiceDate,
      imageUrl,
    };

    const response = await fetch(
      "https://rentcar-backend.onrender.com/api/vehicle",
      {
        method: "POST",
        body: JSON.stringify(vehicle),
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
      setMake("");
      setModel("");
      setColor("");
      setYear("");
      setChassis("");
      setRegister("");
      setMileage("");
      setStatus("");
      setCostPerDay("");
      setLastServiceDate("");
      setImageUrl("");
      setError(null);
      fetchData();
      onClose();
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledCardHeader title="Add New Vehicle" />
        <CardContent>
          <form className="createVehicle" onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <StyledTextField
                label="Make"
                type="text"
                variant="outlined"
                onChange={(e) => setMake(e.target.value)}
                value={make}
              />
              <StyledTextField
                label="Model"
                type="text"
                variant="outlined"
                onChange={(e) => setModel(e.target.value)}
                value={model}
              />
              <StyledTextField
                label="Color"
                type="text"
                variant="outlined"
                onChange={(e) => setColor(e.target.value)}
                value={color}
              />
              <StyledTextField
                label="Year"
                type="text"
                variant="outlined"
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
              <StyledTextField
                label="Chassis"
                type="text"
                variant="outlined"
                onChange={(e) => setChassis(e.target.value)}
                value={chassis}
              />
              <StyledTextField
                label="Register"
                type="text"
                variant="outlined"
                onChange={(e) => setRegister(e.target.value)}
                value={register}
              />
              <StyledAutoComplete
                disablePortal
                options={optionsStatus}
                value={status}
                onChange={(e, newValue) => setStatus(newValue)}
                renderInput={(params) => <TextField {...params} label="Status" />}
              />
              <StyledTextField
                label="Mileage"
                type="text"
                variant="outlined"
                onChange={(e) => setMileage(e.target.value)}
                value={mileage}
              />
              <StyledTextField
                label="Cost per day"
                type="text"
                variant="outlined"
                onChange={(e) => setCostPerDay(e.target.value)}
                value={costPerDay}
              />
              <StyledTextField
                label="Last service date"
                type="date"
                variant="outlined"
                onChange={(e) => setLastServiceDate(e.target.value)}
                value={lastServiceDate}
              />
              <StyledTextField
                label="Image Url"
                type="text"
                variant="outlined"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
              <StyledButton type="submit">Add Vehicle</StyledButton>
              {error && <div className="error">{error}</div>}
            </FormControl>
          </form>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default VehicleForm;