import {
  Box,
  Typography,
  Stack,
  Container,
  Grid,
  useTheme,
} from "@mui/material";
import FoodCard from "../Main/FoodCards";
import FoodCardSkeleton from "../Skeleton/FoodCardSkeleton";
import SnackbarComp from "@else/Components/Else/SnackbarComp";
import HeaderHome from "./Components/HeaderHome";
import { useTranslation } from "react-i18next";
import React from "react";

const HomePre = React.memo(
  ({
    loading,
    error,
    popularMeals,
    setPopularMeals,
    handleCloseSnackbar,
    openSnackbar,
    setOpenSnackbar,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const isDark = theme.palette.mode === "dark";

    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: isDark ? "#050505" : "#f8f9fa",
          position: "relative",
          overflow: "hidden",
          pt: { xxs: 10, md: 15 },
          pb: 8,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background: isDark
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(0, 0, 0, 0.02)",
            filter: "blur(80px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* --- Hero Section --- */}
          <Grid container spacing={4} alignItems="center" mb={12}>
            <Grid item xs={12} md={8} lg={7}>
              <Stack
                spacing={{ xs: 4, md: 5 }}
                alignItems={{ xs: "center", md: "flex-start" }}
                textAlign={{ xs: "center", md: "left" }}
              >
                {/* --- Header Area: Logo + Typography --- */}
                <HeaderHome />
              </Stack>
            </Grid>
          </Grid>

          {/* --- Popular Meals Section --- */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={4}
          >
            <Box>
              <Typography
                variant="h2"
                fontWeight={800}
                gutterBottom
                color="primary.main"
              >
                {t("Popular Dishes")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t("Most ordered items this week")}
              </Typography>
            </Box>
          </Stack>

          {/* --- Main Content --- */}

          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 4,
              px: 2,
              scrollSnapType: "x mandatory",
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
                <Box
                  key={item}
                  sx={{ minWidth: 300, scrollSnapAlign: "start" }}
                >
                  <FoodCardSkeleton />
                </Box>
              ))
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              popularMeals.map((meal) => (
                <Box
                  key={meal.id}
                  sx={{ minWidth: 300, scrollSnapAlign: "start", p: 3 }}
                >
                  <FoodCard
                    {...meal}
                    setPopularMeals={setPopularMeals}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                </Box>
              ))
            )}
          </Box>

          {/* --- Footer Info --- */}
          <Box
            sx={{
              mt: 10,
              p: 6,
              borderRadius: 10,
              textAlign: "center",
              background: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.01)",
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                maxWidth: 700,
                mx: "auto",
                fontWeight: 500,
                fontStyle: "italic",
                color: "text.secondary",
              }}
            >
              {t("desc 2")}
            </Typography>
          </Box>
        </Container>

        <SnackbarComp
          openSnackbar={openSnackbar.openSnackbar}
          msg={openSnackbar.message}
          color={openSnackbar.color}
          handleClose={handleCloseSnackbar}
        />
      </Box>
    );
  },
);
export default HomePre;
