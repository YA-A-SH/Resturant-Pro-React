import {
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Container,
  useTheme,
  Slide,
} from "@mui/material";
import FoodCard from "../Main/FoodCards";
import FoodCardSkeleton from "../Skeleton/FoodCardSkeleton";

export default function HomePre({
  loading,
  error,
  popularMeals,
  handleClose,
  open2,
  open,
  toggleFavorite,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "radial-gradient(circle at 50% -20%, #1a1a1c 0%, #050505 80%)"
          : "radial-gradient(circle at 50% -20%, #ffffff 0%, #f8f9fa 80%)",
        pt: 12,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Stack spacing={2} alignItems="center" mb={8}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              fontWeight: 900,
              letterSpacing: "-1px",
              background: isDark
                ? "linear-gradient(to right, #fff, #A1A1A6)"
                : "linear-gradient(to right, #1d1d1f, #434343)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Experience Real Taste
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 600, fontWeight: 400, opacity: 0.8 }}
          >
            Crafted meals, premium ingredients, unforgettable flavor.
          </Typography>
        </Stack>

        {/* Horizontal Scrolling Section */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 4,
            px: 2,
            scrollSnapType: "x mandatory", // تجعل التمرير يقف عند كل بطاقة
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              borderRadius: 10,
              "&:hover": { bgcolor: "primary.main" },
            },
          }}
        >
          {loading ? (
            [1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ minWidth: 300, scrollSnapAlign: "start" }}>
                <FoodCardSkeleton />
              </Box>
            ))
          ) : error ? (
            <Box sx={{ width: "100%", py: 10, textAlign: "center" }}>
              <Typography color="error" variant="h6">
                {error}
              </Typography>
            </Box>
          ) : (
            popularMeals.map((meal) => (
              <Box
                key={meal.id}
                sx={{ minWidth: 300, scrollSnapAlign: "start" }}
              >
                <FoodCard {...meal} toggleFavorite={toggleFavorite} />
              </Box>
            ))
          )}
        </Box>

        {/* Info Text */}
        <Box
          sx={{
            mt: 10,
            p: 4,
            borderRadius: 8,
            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{
              maxWidth: 800,
              mx: "auto",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}
          >
            "Based in Gaza, we deliver premium-quality food with care, passion,
            and modern presentation — because great taste deserves a great
            experience."
          </Typography>
        </Box>
      </Container>

      {/* Enhanced Snackbars */}
      <Snackbar
        open={open || open2}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={open ? "success" : "info"}
          variant="filled"
          sx={{
            borderRadius: "12px",
            fontWeight: "600",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            bgcolor: open ? "success.main" : "primary.main",
          }}
        >
          {open
            ? "Welcome back 🎉 Login successful"
            : "Added to cart successfully! 🛒"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
