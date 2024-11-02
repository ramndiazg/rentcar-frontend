import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <div className="" style={{ alignItems: "center" }}>
        <Card sx={{ maxWidth: 175, alignContent: "center" }}>
          <CardContent>
            <Typography variant="h5" component="div">
            {user.firstName}
            </Typography>
            <Typography variant="h5" component="div">
            {user.lastName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {user.phone}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {user.email}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {user.role}
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

export default UserDetails;
