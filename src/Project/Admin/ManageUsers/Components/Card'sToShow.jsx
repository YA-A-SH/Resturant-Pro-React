import { Box, Button, Grid } from "@mui/material";
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
  return (
    <>
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
          justifyContent: { xs: "space-evenly" },
        }}
      >
        {["Manager's", "Chef's", "User's"].map((type) => (
          <Button
            key={type}
            variant={selectedTap === type ? "contained" : "text"}
            onClick={() => setSelectedTap(type)}
            sx={{
              borderRadius: "100px",
              px: { xs: 3, sm: 5 },
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              transition: "0.4s",
              boxShadow:
                selectedTap === type ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
              color: selectedTap === type ? "#fff" : "text.secondary",
              "&:hover": {
                bgcolor:
                  selectedTap === type ? "primary.main" : "rgba(0,0,0,0.05)",
              },
            }}
          >
            {type}
          </Button>
        ))}
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        {selectedTap === "Chef's" &&
          chefs.map((chef) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={chef.name} sx={{}}>
              <CardBase data={chef} isDark={isDark} id="chef" />
            </Grid>
          ))}
        {selectedTap === "Manager's" &&
          managers.map((manager) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={manager.name} sx={{}}>
              <CardBase data={manager} isDark={isDark} id="manager" />
            </Grid>
          ))}
        {selectedTap === "User's" && (
          <>
            {loading &&
              [...Array(8)].map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CardBaseSkeleton isDark={isDark} />
                </Grid>
              ))}{" "}
            {error && (
              <Typography color="error" variant="h3">
                {error}
              </Typography>
            )}
            {!loading &&
              !error &&
              users.map((user) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={user.name} sx={{}}>
                  <CardBase data={user} isDark={isDark} id="user" />
                </Grid>
              ))}
          </>
        )}
      </Grid>{" "}
    </>
  );
}
