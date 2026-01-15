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
            ? `radial-gradient(circle, rgba(254, 254, 254, 0) 0%, rgba(255, 255, 255, 0.03) 100%), url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1500')`
            : `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0, 0, 0, 0.19) 100%), url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1500')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" }, // الـ fixed أحياناً بيعمل غبش في الموبايل
          mb: 8,
          borderRadius: "0 0 80px 80px",
          filter: isDark ? "brightness(0.8) contrast(1.1)" : "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)",
            zIndex: 1,
          }}
        />

        <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.8rem", md: "5rem" },
              color: "white",
              letterSpacing: -1,
              mb: 2,
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            ZEUS Restaurant
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 4,
              fontWeight: 500,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
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
              px: 6,
              py: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "none",
              bgcolor: "primary.main",
              boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              },
              transition: "0.3s all ease",
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
