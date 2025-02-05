"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../components/UserForm";
import AppbarTest from "../components/AppbarTest";
import Footer from "../components/Footer";
import UserTable from "../components/UserTable";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";

export default function user() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        "https://rentcar-backend.onrender.com/api/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://rentcar-backend.onrender.com/api/user/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        fetchData();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  return (
    <div>
      <AppbarTest />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" gutterBottom>
                Users
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ mb: 2 }}
              >
                Add User
              </Button>
              {data.length > 0 ? (
                <UserTable user={data} onDelete={handleDelete} />
              ) : (
                <Typography>No users found.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            p: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 600,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <UserForm onClose={handleClose} fetchData={fetchData} />
        </Paper>
      </Modal>
      <Footer />
    </div>
  );
}
