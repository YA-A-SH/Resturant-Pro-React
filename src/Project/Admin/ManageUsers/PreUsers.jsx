import React, { useEffect } from "react";
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
  useTheme,
} from "@mui/material";
import {
  SearchRounded,
  AdminPanelSettingsRounded,
  GroupAddRounded,
  Clear,
} from "@mui/icons-material";
import UsersCharts from "./Components/User'sCharts";
import { fetchFakeUser } from "@user/RTK/ElseSlice";
import CardsToShowAndTaps from "./Components/Card'sToShow";
import AddChefModal from "./Components/AddChefComp";
import SnackbarComp from "@else/Components/Else/SnackbarComp";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ChefsContext } from "@else/Components/Context/MainContext";
import QuickStatusCards from "./Components/QuickStatusCards";

const PreUser = React.memo(
  ({
    openAddChefComp,
    setOpenAddChefComp,
    searchText,
    setSearchText,
    openSnackbar,
    handleCloseSnackbar,
    setOpenSnackbar,
  }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme();

    const text = `${t("Search by")}${t("name")}`;

    const isDark = theme.palette.mode === "dark";

    useEffect(() => {
      dispatch(fetchFakeUser());
    }, [dispatch]);

    useEffect(() => {
      setSearchText("");
    }, [setSearchText]);

    return (
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xxs: 12, md: 15 },
          pb: 8,
          background: isDark
            ? `radial-gradient(circle at top right, ${theme.palette.admin.main}15, transparent)`
            : `radial-gradient(circle at top right, ${theme.palette.admin.main}08, transparent)`,
        }}
      >
        <Container maxWidth="xl">
          {/* --- Header Section --- */}

          <Stack
            direction={{ xxs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xxs: "flex-start", md: "flex-end" }}
            spacing={3}
            mb={8}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <AdminPanelSettingsRounded sx={{ color: "admin.main" }} />
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 800,
                    color: "admin.main",
                    letterSpacing: 2,
                  }}
                >
                  {t("Staff & Community")}
                </Typography>
              </Stack>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  letterSpacing: -2,
                  lineHeight: 1,
                  fontSize: {
                    xxs: "1.8rem",
                    xs: "2.6rem",
                    md: "3.5rem",
                    lg: "4.5rem",
                  },
                }}
              >
                {t("Management")}{" "}
                <Box component="span" sx={{ color: "admin.main" }}>
                  {t("Portal")}
                </Box>
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, maxWidth: 500, opacity: 0.8 }}
              >
                {t("desc 16")}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<GroupAddRounded />}
              sx={{
                borderRadius: "16px",
                px: 4,
                mt: { xxs: 2, xs: 2, md: 0 },
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
              {t("Add New Chef")}
            </Button>
          </Stack>
          <AddChefModal
            setOpenSnackbar={setOpenSnackbar}
            open={openAddChefComp}
            handleClose={() => setOpenAddChefComp(false)}
          />
          {/* --- Charts --- */}
          <Box sx={{ mb: 6 }}>
            <UsersCharts />
          </Box>

          {/* --- Quick Stats Cards --- */}
          <QuickStatusCards />

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
                {t("Clear")}
              </Button>
            </Stack>
          </Card>

          {/* --- Taps && Show Cards--- */}
          <CardsToShowAndTaps searchText={searchText} />
          <SnackbarComp
            openSnackbar={openSnackbar.openSnackbar}
            msg={openSnackbar.message}
            color={openSnackbar.color}
            handleClose={handleCloseSnackbar}
          />
        </Container>
      </Box>
    );
  },
);

export default PreUser;
