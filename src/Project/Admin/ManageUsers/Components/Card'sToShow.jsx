import { Box, Button, Grid, Typography, useTheme, Fade } from "@mui/material";
import CardBase from "./CardsBase";
import CardBaseSkeleton from "./CardBaseSkeleton";

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
              users.map((user, index) => (
                <Fade in timeout={500 + index * 50} key={user.name}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CardBase data={user} isDark={isDark} id="user" />
                  </Grid>
                </Fade>
              ))}
          </>
        )}
      </Grid>
    </>
  );
}
