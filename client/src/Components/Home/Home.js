import React from "react";
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import EventIcon from '@mui/icons-material/Event'
import { useNavigate } from "react-router-dom";


const Home = () => {
   const navigate=useNavigate()

    const NavigateToSignIn=(e)=>{
        e.preventDefault()
        navigate('/sign-in')
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
 
  return (
   <Box
    sx={{
      position: 'relative',
      width: '100%',
      height:'100vh',
      minHeight: '400px', // Ensures the section has a minimum height
      backgroundImage:'url(https://www.avpartners.com/wp-content/uploads/2017/08/Seminars-1.jpg)', // Background image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      bgcolor: '#E0F2F1', // Fallback color
      color: '#FFFFFF',
      display:{
            paddingTop:50
      },
      
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
        zIndex: 1,
      }}
    />
    <Container
      sx={{
        position: 'relative',
        zIndex: 2,
        paddingY: 6,
        paddingX: { xs: 2, sm: 4, md: 6 },
        textAlign: 'center',
      }}
    >
      <Paper 
        elevation={6} 
        sx={{
          bgcolor: '#F0F0F0',
          paddingY: 4,
          paddingX: 4,
          borderRadius: 4,
          boxShadow: 3,
          mx: 'auto',
          maxWidth: 'md',
          position: 'relative',
          zIndex: 2,
          marginBottom: 4,
          border:'solid',
          borderColor:'#C0C0C0'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: '700',
              color: '#002F6C',
              fontFamily: 'Roboto, sans-serif',
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.2,
            }}
          >
            EVENT MANAGEMENT
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 300,
              color: '#002F6C',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              lineHeight: 1.5,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Stress-free planning for your perfect event
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
          onClick={NavigateToSignIn}
            variant="contained"
            color="secondary"
            sx={{ 
              bgcolor: '#002F6C',
              '&:hover': {
                bgcolor: '#002F6C',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Get Started
          </Button>
        </Box>
      </Paper>
 
    </Container>
  </Box>
  );
};

export default Home;
