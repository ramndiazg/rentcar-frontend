import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ClientDetails = ({ client }) => {
  return (
    <div className="client-details">
      <div className="" style={{ alignItems: "center" }}>
        <Card sx={{ maxWidth: 175, alignContent: "center" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {client.firstName}
            </Typography>
            <Typography variant="h5" component="div">
              {client.lastName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {client.phone}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {client.email}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {client.address}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {client.membershipStatus}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {client.preferredPaymentMethod}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default ClientDetails;
