import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const VehicleDetails = ({ vehicle }) => {
  return (
    <div className="" style={{ alignItems: "center"}}>
      <Card sx={{ maxWidth: 175, alignContent: "center" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {vehicle.make}
          </Typography>
          <Typography variant="h5" component="div">
            {vehicle.model}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {vehicle.color}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {vehicle.year}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {vehicle.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Rent</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default VehicleDetails;
