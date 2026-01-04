import { ChevronRightRounded } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";

export default function HeroSec({ isDark, navigate }) {
  return (
    <>
      <Box
        sx={{
          height: { xs: 450, md: 550 },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: isDark
            ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1500')`
            : `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.4)), url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1500')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          mb: 8,
          borderRadius: "0 0 80px 80px",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 2 }}>
          <Typography
            variant="h1"
            fontWeight="900"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              color: "white",
              letterSpacing: -2,
              mb: 2,
            }}
          >
            DAC FOOD
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              color: "#ffffffff",
              mb: 4,
              fontWeight: 500,
            }}
          >
            Crafting Culinary Experiences, Not Just Meals.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ChevronRightRounded />}
            sx={{
              borderRadius: 4,
              px: 5,
              py: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
            onClick={() => navigate("/meals")}
          >
            Explore the Menu
          </Button>
        </Container>
      </Box>
    </>
  );
}
