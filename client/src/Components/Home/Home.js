import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <Container sx={{ mt: 20 ,bgcolor:'#FFF8E1',paddingY:4,paddingX:8,borderRadius:5,}}>
      <Typography variant="h2"  md={{fontSize:'large'}} sx={{ fontWeight: "bold", color: "#003366",fontFamily:'Montserrat,sans-serif' }}>
        EVENT MANAGEMENT
      </Typography>
      <Typography  sx={{ fontWeight: "400", color: "#6D4F28",fontSize:'24px'}}>
      Stress-free planning for your perfect event
      </Typography>
    </Container>
  );
};

export default Home;
