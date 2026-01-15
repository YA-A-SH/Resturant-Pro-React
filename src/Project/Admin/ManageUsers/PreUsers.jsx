import { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Stack,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  SearchRounded,
  FilterListRounded,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";

import UsersCharts from "./Components/User'sCharts";
import { fetchFakeUser } from "../../User/RTK/MainSlice";
import CardsToShowAndTaps from "./Components/Card'sToShow";

export default function PreUser({
  dispatch,
  isDark,
  users,
  loading,
  error,
  selectedTap,
  setSelectedTap,
  managers,
  chefs,
}) {
  useEffect(() => {
    if (selectedTap === "User's") {
      dispatch(fetchFakeUser());
    }
  }, [selectedTap, dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 12, md: 15 },
        pb: 8,
        background: isDark
          ? "radial-gradient(circle at top right, rgba(255, 87, 34, 0.05), transparent)"
          : "radial-gradient(circle at top right, rgba(255, 87, 34, 0.03), transparent)",
      }}
    >
      <Container maxWidth="xl">
        {/* --- Header Section --- */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={3}
          mb={6}
        >
          <Box>
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{ letterSpacing: -1 }}
            >
              User{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Management
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Monitor, manage and verify your community members in Gaza.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AdminPanelSettingsRounded />}
            sx={{ borderRadius: 4, px: 4, py: 1.5, fontWeight: "bold" }}
          >
            Add New Staff
          </Button>
        </Stack>
        {/* Charts */}
        <UsersCharts isDark={isDark} />
        {/* --- Stats Cards --- */}
        <Grid
          container
          spacing={3}
          mb={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {["Total Users", "Active Now", "Banned"].map((label, index) => (
            <Grid item xs={12} sm={4} key={label}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 6,
                  bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                  border: "1px solid",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" fontWeight={900} color="primary">
                  {index === 0 ? "55,930" : index === 1 ? "8540" : "120"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* --- Search & Filter Bar --- */}
        <Card
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 5,
            bgcolor: isDark ? "rgba(30,30,30,0.6)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search To Any User ..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4 },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListRounded />}
              sx={{ borderRadius: 4, px: 3 }}
            >
              Filters
            </Button>
          </Stack>
        </Card>
        {/* --- Taps && Show Cards--- */}

        <CardsToShowAndTaps
          setSelectedTap={setSelectedTap}
          selectedTap={selectedTap}
          chefs={chefs}
          managers={managers}
          users={users}
          loading={loading}
          error={error}
          isDark={isDark}
        />
      </Container>
    </Box>
  );
}
