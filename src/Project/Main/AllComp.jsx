import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import FoodCard from "./FoodCards";
import { useContext, useState } from "react";
import { OpenAlert } from "../Context/MainContext";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FoodCardSkeleton from "../Skeleton/FoodCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function Base({
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
  toggleFavorite,
  itemsPerPage = 12,
}) {
  const theme = useTheme();
  const { open, setOpen } = useContext(OpenAlert);
  const isDark = theme.palette.mode === "dark";

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const gradientBackground = isDark
    ? "radial-gradient(circle at top, #1a002a 0%, #0b0b0f 45%, #000 100%)"
    : "radial-gradient(circle at top, #fff5e6 0%, #ffffff 100%)";

  const getPaginationButtons = () => {
    let buttons = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      if (currentPage <= 2) {
        buttons = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        buttons = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        buttons = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return buttons;
  };

  return (
    <Box
      sx={{ minHeight: "100vh", background: gradientBackground, pt: 5, pb: 10 }}
    >
      <Container maxWidth="xl">
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
              "&:hover": {
                transform: "translateY(-2px)",
                bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#fff",
              },
            }}
          >
            Price:{" "}
            <strong style={{ marginLeft: "5px" }}>
              {sortAscending ? "Low to High" : "High to Low"}
            </strong>
          </Button>
        </Box>

        {id === "1" || id === "2" ? (
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
          <Box
            sx={{
              width: { xs: "100%", sm: "fit-content" },
              m: "0 auto 50px auto",
              p: 0.8,
              borderRadius: "100px",
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              display: "flex",
              gap: 1,
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.1)" : "transparent"
              }`,
            }}
          >
            {["Breakfast", "Lunch", "Dinner"].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "contained" : "text"}
                onClick={() => setSelectedType(type)}
                sx={{
                  borderRadius: "100px",
                  px: { xs: 3, sm: 5 },
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  transition: "0.4s",
                  boxShadow:
                    selectedType === type
                      ? "0 8px 20px rgba(0,0,0,0.2)"
                      : "none",
                  color: selectedType === type ? "#fff" : "text.secondary",
                  "&:hover": {
                    bgcolor:
                      selectedType === type
                        ? "primary.main"
                        : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                {type}
              </Button>
            ))}
          </Box>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType + currentPage} // يغير الأنيميشن عند تغيير النوع أو الصفحة
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
                        setOpen={setOpen}
                        toggleFavorite={toggleFavorite}
                      />
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
          </motion.div>
        </AnimatePresence>

        {/* ===== MODERN NUMERIC PAGINATION ===== */}
        {totalPages > 1 && (
          <Stack direction="row" spacing={1.5} justifyContent="center" mt={10}>
            {getPaginationButtons().map((btn, idx) => (
              <Button
                key={idx}
                disabled={btn === "..."}
                onClick={() => btn !== "..." && setCurrentPage(btn)}
                sx={{
                  minWidth: "45px",
                  height: "45px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  bgcolor:
                    currentPage === btn ? "primary.main" : "background.paper",
                  color: currentPage === btn ? "#fff" : "text.primary",
                  boxShadow: theme.shadows[1],
                  border: `1px solid ${
                    currentPage === btn ? "transparent" : theme.palette.divider
                  }`,
                  "&:hover": {
                    bgcolor:
                      currentPage === btn ? "primary.main" : "action.hover",
                    transform: btn !== "..." ? "translateY(-2px)" : "none",
                  },
                }}
              >
                {btn}
              </Button>
            ))}
          </Stack>
        )}
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: "15px",
            px: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            bgcolor: theme.palette.success.main,
          }}
        >
          Tasty choice! Added to your cart 🍔
        </Alert>
      </Snackbar>
    </Box>
  );
}
