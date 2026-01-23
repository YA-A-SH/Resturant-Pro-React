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
  AdminPanelSettingsRounded,
  GroupAddRounded,
  Clear,
} from "@mui/icons-material";
import UsersCharts from "./Components/User'sCharts";
import { fetchFakeUser } from "../../User/RTK/MainSlice";
import CardsToShowAndTaps from "./Components/Card'sToShow";
import AddChefModal from "./Components/AddChefComp";

export default function PreUser({
  dispatch,
  isDark,
  theme,
  loading,
  error,
  selectedTap,
  setSelectedTap,
  chefs,
  setChefs,
  openAddChefComp,
  setOpenAddChefComp,
  handleSearch,
  searchText,
  setSearchText,
  chefSearch,
  text,
  ChefsShow,
  ManagersShow,
  UsersShow,
}) {
  useEffect(() => {
    dispatch(fetchFakeUser());
  }, [dispatch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchText]);

  useEffect(() => {
    setSearchText("");
  }, [setSearchText]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 12, md: 15 },
        pb: 8,
        background: isDark
          ? `radial-gradient(circle at top right, ${theme.palette.admin.main}15, transparent)`
          : `radial-gradient(circle at top right, ${theme.palette.admin.main}08, transparent)`,
      }}
    >
      <Container maxWidth="xl">
        {/* --- Header Section --- */}

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={3}
          mb={8}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <AdminPanelSettingsRounded sx={{ color: "admin.main" }} />
              <Typography
                variant="overline"
                sx={{ fontWeight: 800, color: "admin.main", letterSpacing: 2 }}
              >
                Staff & Community
              </Typography>
            </Stack>
            <Typography
              variant="h2"
              fontWeight={900}
              sx={{ letterSpacing: -2, lineHeight: 1 }}
            >
              Management{" "}
              <Box component="span" sx={{ color: "admin.main" }}>
                Portal
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 500, opacity: 0.8 }}
            >
              Comprehensive oversight of your culinary team and community
              members. Track activities, roles, and status in real-time.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<GroupAddRounded />}
            sx={{
              borderRadius: "16px",
              px: 4,
              py: 2,
              fontWeight: 800,
              background: theme.palette.admin.gradient,
              boxShadow: `0 10px 25px ${theme.palette.admin.main}40`,
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: `0 15px 30px ${theme.palette.admin.main}60`,
              },
              transition: "0.5s",
            }}
            onClick={() => setOpenAddChefComp(true)}
          >
            Add New Chef
          </Button>
        </Stack>
        <AddChefModal
          open={openAddChefComp}
          setChefs={setChefs}
          chefs={chefs}
          handleClose={() => setOpenAddChefComp(false)}
        />
        {/* --- Charts --- */}
        <Box sx={{ mb: 6 }}>
          <UsersCharts isDark={isDark} />
        </Box>

        {/* --- Quick Stats Cards --- */}
        <Grid
          container
          spacing={3}
          mb={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[
            {
              label: "Total Users",
              value: "55,930",
              color: theme.palette.admin.main,
            },
            { label: "Active Now", value: "8,540", color: "#10B981" },
            { label: "Restricted", value: "120", color: "#EF4444" },
          ].map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: "28px",
                  bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                  border: "1px solid",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                  position: "relative",
                  overflow: "hidden",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    bgcolor: stat.color,
                    opacity: 0.6,
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={800}
                  sx={{ textTransform: "uppercase", letterSpacing: 1.5, mb: 1 }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{ color: stat.color }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* --- Search & Filter Bar --- */}
        <Card
          sx={{
            p: 2.5,
            mb: 6,
            borderRadius: "24px",
            bgcolor: isDark
              ? "rgba(30, 30, 35, 0.6)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={text}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: "admin.main", ml: 1 }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "16px",
                  bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                  "& fieldset": { border: "none" },
                  "&:hover": {
                    bgcolor: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.04)",
                  },
                },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<Clear />}
              color="error"
              sx={{ minWidth: "100px" }}
              onClick={() => setSearchText("")}
            >
              Clear
            </Button>
          </Stack>
        </Card>

        {/* --- Taps && Show Cards--- */}
        <CardsToShowAndTaps
          setSelectedTap={setSelectedTap}
          selectedTap={selectedTap}
          chefs={ChefsShow}
          managers={ManagersShow}
          users={UsersShow}
          loading={loading}
          error={error}
          isDark={isDark}
          searchText={searchText}
          chefSearch={chefSearch}
        />
      </Container>
    </Box>
  );
}
