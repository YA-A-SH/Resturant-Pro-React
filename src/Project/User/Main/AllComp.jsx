import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useTheme,
  Container,
  Pagination,
} from "@mui/material";
import FoodCard from "./FoodCards";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { OpenSnackbarContext } from "@else/Components/Context/MainContext";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FoodCardSkeleton from "../Skeleton/FoodCardSkeleton";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import SnackbarComp from "@else/Components/Else/SnackbarComp";
import ButtonsAllComp from "./Components/ButtonsAllComp";
import { useTranslation } from "react-i18next";

const Base = React.memo(
  ({
    loading,
    error,
    data,
    id,
    msg,
    body,
    selectedType,
    setSelectedType,
    sortAscending,
    setSortAscending,
    itemsPerPage = 12,
    setPopularMeals,
  }) => {
    //Hooks Use
    const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useTheme();
    const { t } = useTranslation();

    // Variables

    const isDark = theme.palette.mode === "dark";
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const gradientBackground = isDark
      ? "radial-gradient(circle at top, #1a002a 0%, #0b0b0f 45%, #000 100%)"
      : "radial-gradient(circle at top, #fff5e6 0%, #ffffff 100%)";
    const currentData = useMemo(() => {
      const startIdx = (currentPage - 1) * itemsPerPage;
      return data.slice(startIdx, startIdx + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    // Functions

    const handleCloseSnackbar = useCallback(
      (reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenSnackbar({ openSnackbar: false });
      },
      [setOpenSnackbar],
    );
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: gradientBackground,
          pt: 5,
          pb: 10,
        }}
      >
        <Container maxWidth="xl">
          {/* ===== Sort BTN ===== */}

          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              onClick={() => setSortAscending((prev) => !prev)}
              startIcon={
                <SwapVertIcon sx={{ color: theme.palette.primary.main }} />
              }
              sx={{
                px: 3,
                py: 1,
                borderRadius: "100px",
                bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                backdropFilter: "blur(10px)",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }`,
                color: "text.primary",
                boxShadow: isDark
                  ? "0 10px 30px rgba(0,0,0,0.5)"
                  : "0 10px 20px rgba(0,0,0,0.05)",
                textTransform: "none",
                transition: "0.4s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#fff",
                },
              }}
            >
              {t("Price:")}{" "}
              <strong style={{ marginLeft: "5px" }}>
                {sortAscending ? t("Low to High") : t("High to Low")}
              </strong>
            </Button>
          </Box>

          {/* ===== Check if the Comp is Meals or Else===== */}

          {id === "drinks" || id === "sweets" ? (
            <Stack spacing={1} alignItems="center" mb={6}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, letterSpacing: -1, textAlign: "center" }}
              >
                {msg}
              </Typography>
              <Typography
                sx={{ color: "text.secondary", fontSize: 16, opacity: 0.8 }}
              >
                {body}
              </Typography>
            </Stack>
          ) : (
            <ButtonsAllComp
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          )}

          {/* ===== Cards ===== */}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType + currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4} justifyContent="center">
                {loading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                      <FoodCardSkeleton />
                    </Grid>
                  ))
                ) : error ? (
                  <Box sx={{ textAlign: "center", mt: 6 }}>
                    <Typography variant="h6" color="error">
                      {error}
                    </Typography>
                  </Box>
                ) : (
                  currentData.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                      <Box
                        sx={{
                          transition: "0.3s",
                          "&:hover": { transform: "translateY(-8px)" },
                        }}
                      >
                        <FoodCard
                          {...item}
                          setOpenSnackbar={setOpenSnackbar}
                          setPopularMeals={setPopularMeals}
                        />
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            </motion.div>
          </AnimatePresence>

          {/* =====  NUMERIC PAGINATION ===== */}

          {totalPages > 1 && (
            <Stack alignItems="center" mt={8}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "12px",
                    fontWeight: "bold",
                    height: "45px",
                    minWidth: "45px",
                  },
                }}
              />
            </Stack>
          )}
        </Container>

        {/* ===== Snackbar ===== */}

        <SnackbarComp
          openSnackbar={openSnackbar.openSnackbar}
          msg={t("Tasty choice! Added to your cart 🍔")}
          color="success"
          handleClose={handleCloseSnackbar}
        />
      </Box>
    );
  },
);
export default Base;
