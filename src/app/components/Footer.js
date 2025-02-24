import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 3,
        mt: "auto",
        backgroundColor: "#1c65b3",
        color: "white",
        width: "100%",
        height: "auto",
        position: "sticky",
        top: "100vh",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
        <Box>
          <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Created by: Ramon Diaz
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;