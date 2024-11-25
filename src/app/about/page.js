"use client";

import * as React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import AppbarTest from "../components/AppbarTest";
import Footer from "../components/Footer";

const StyledContainer = styled("div")({
  textAlign: "center",
  padding: "50px",
  backgroundColor: "#f5f5f5",
  color: "#333",
});

const StyledTitle = styled("h1")({
  fontSize: "2.5rem",
  marginBottom: "20px",
});

const StyledParagraph = styled("p")({
  fontSize: "1.2rem",
  lineHeight: "1.8",
  marginBottom: "30px",
});

const StyledEmployeeList = styled("ul")({
  listStyle: "none",
  padding: 0,
  marginBottom: "40px",
});

const StyledEmployeeItem = styled("li")({
  fontSize: "1.1rem",
  marginBottom: "10px",
});

const StyledSocialLinks = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "15px",
});

const StyledButton = styled(Button)({
  backgroundColor: "#01579b",
  color: "white",
  "&:hover": {
    backgroundColor: "#01406e",
  },
});

export default function AboutPage() {
  return (
    <div>
      <AppbarTest />
      <StyledContainer>
        <StyledTitle>About Us</StyledTitle>
        <StyledParagraph>
          Welcome to RentCar App, your trusted partner for car rentals since
          2015. Our mission is to provide reliable, affordable, and high-quality
          vehicles for your journeys. Over the years, we’ve served thousands of
          customers, making every trip memorable and seamless.
        </StyledParagraph>
        <StyledParagraph>
          Meet our team of experts who ensure the best experience for you:
        </StyledParagraph>
        <StyledEmployeeList>
          <StyledEmployeeItem>Ramon Diaz - CEO and Founder</StyledEmployeeItem>
          <StyledEmployeeItem>
            Mariedys Campusano - Customer Service Manager
          </StyledEmployeeItem>
          <StyledEmployeeItem>Ashley Nawell - Fleet Manager</StyledEmployeeItem>
        </StyledEmployeeList>
        <StyledParagraph>
          Follow us on social media to stay updated with our latest offers and
          news:
        </StyledParagraph>
        <StyledSocialLinks>
          <StyledButton
            variant="contained"
            href="https://facebook.com"
            target="_blank"
          >
            Facebook
          </StyledButton>
          <StyledButton
            variant="contained"
            href="https://instagram.com"
            target="_blank"
          >
            Instagram
          </StyledButton>
          <StyledButton
            variant="contained"
            href="https://wa.me/1234567890"
            target="_blank"
          >
            WhatsApp
          </StyledButton>
        </StyledSocialLinks>
      </StyledContainer>
      <Footer />
    </div>
  );
}
