import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Fade,
  Stack,
} from "@mui/material";
import CardBase from "./CardsBase";
import CardBaseSkeleton from "./CardBaseSkeleton";
import { useEffect, useState } from "react";

export default function CardsToShowAndTaps({
  setSelectedTap,
  selectedTap,
  chefs,
  managers,
  users,
  loading,
  error,
  isDark,
}) {
  const theme = useTheme();

  const tabs = [
    { id: "Manager's", label: "Managers" },
    { id: "Chef's", label: "Master Chefs" },
    { id: "User's", label: "Community" },
  ];
  const cardsPerPage = 8;
  const totalPages = Math.ceil(users?.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startCard = (currentPage - 1) * cardsPerPage;
  const usersToShow = users?.slice(startCard, startCard + cardsPerPage);

  const paginationButtons = () => {
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedTap]);
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "fit-content" },
          m: "0 auto 60px auto",
          p: 1,
          borderRadius: "100px",
          bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
          boxShadow: isDark
            ? "0 20px 40px rgba(0,0,0,0.2)"
            : "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = selectedTap === tab.id;
          return (
            <Button
              key={tab.id}
              onClick={() => setSelectedTap(tab.id)}
              disableRipple
              sx={{
                borderRadius: "100px",
                px: { xs: 3, sm: 6 },
                py: 1.5,
                fontWeight: 800,
                fontSize: "0.9rem",
                textTransform: "capitalize",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

                background: isActive
                  ? theme.palette.admin.gradient
                  : "transparent",
                color: isActive ? "#fff" : "text.secondary",
                boxShadow: isActive
                  ? `0 10px 20px ${theme.palette.admin.main}40`
                  : "none",

                "&:hover": {
                  bgcolor: isActive
                    ? "none"
                    : isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  color: isActive ? "#fff" : "text.primary",
                  transform: isActive ? "scale(1.05)" : "none",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      <Grid
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {selectedTap === "Manager's" &&
          managers.map((manager, index) => (
            <Fade in timeout={500 + index * 100} key={manager.name}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CardBase data={manager} isDark={isDark} id="manager" />
              </Grid>
            </Fade>
          ))}

        {selectedTap === "Chef's" &&
          chefs.map((chef, index) => (
            <Fade in timeout={500 + index * 100} key={chef.name}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CardBase data={chef} isDark={isDark} id="chef" />
              </Grid>
            </Fade>
          ))}

        {selectedTap === "User's" && (
          <>
            {loading &&
              [...Array(8)].map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CardBaseSkeleton isDark={isDark} />
                </Grid>
              ))}

            {error && (
              <Box sx={{ width: "100%", textAlign: "center", mt: 10 }}>
                <Typography color="error" variant="h4" fontWeight={900}>
                  {error}
                </Typography>
              </Box>
            )}

            {!loading &&
              !error &&
              usersToShow?.map((user, index) => (
                <Fade in timeout={500 + index * 50} key={user.name}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CardBase data={user} isDark={isDark} id="user" />
                  </Grid>
                </Fade>
              ))}
          </>
        )}


       
      </Grid>
       {selectedTap === "User's" ? (
          totalPages > 1 ? (
            <Stack
              direction="row"
              spacing={1.2}
              justifyContent="center"
              alignItems="center"
              mt={8}
              mb={4}
            >
              {paginationButtons().map((btn, idx) => {
                const isActive = currentPage === btn;
                const isEllipsis = btn === "...";

                return (
                  <Button
                    key={idx}
                    disabled={isEllipsis}
                    onClick={() => !isEllipsis && setCurrentPage(btn)}
                    sx={{
                      minWidth: isEllipsis ? "35px" : "48px",
                      height: "48px",
                      p: 0,

                      borderRadius: "16px",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                      bgcolor: isActive
                        ? "admin.main"
                        : isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.8)",

                      color: isActive
                        ? "#fff"
                        : isDark
                          ? "rgba(255,255,255,0.7)"
                          : "text.primary",

                      border: "1px solid",
                      borderColor: isActive
                        ? "admin.main"
                        : isDark
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.06)",

                      boxShadow: isActive
                        ? `0 8px 20px -6px ${theme.palette.admin.main}`
                        : "none",

                      backdropFilter:
                        !isActive && !isEllipsis ? "blur(8px)" : "none",

                      "&:hover": {
                        bgcolor: isActive ? "admin.main" : "admin.main",
                        color: "#fff",
                        transform: !isEllipsis ? "translateY(-4px)" : "none",
                        boxShadow: !isEllipsis
                          ? `0 12px 20px -8px ${theme.palette.admin.main}`
                          : "none",
                        borderColor: "admin.main",
                      },

                      "&.Mui-disabled": {
                        color: isDark
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(0,0,0,0.3)",
                        border: "none",
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    {btn}
                  </Button>
                );
              })}
            </Stack>
          ) : null
        ) : null}
    </>
  );
}
