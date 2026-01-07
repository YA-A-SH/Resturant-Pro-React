import { Box, Typography, Grid, Container, Paper } from "@mui/material";
import Mission from "./Missions";
import Counter from "./Counter";
import TeamSec from "./TeamSec";
import HeroSec from "./HeroSec";

export default function AboutUs({
  theme,
  navigate,
  textSecondary,
  cardBg,
  teamMembers,
  stats,
  isDark,
}) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      {/* ===== LUXURY HERO SECTION ===== */}
      <HeroSec navigate={navigate} isDark={isDark} />

      {/* ===== MISSION & VISION ===== */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          <Mission
            msg="Our Mission"
            msgBody="We believe food is an art. Our mission is to combine the
                freshest ingredients with creative recipes to bring joy to every
                table."
            cardBg={cardBg}
            theme={theme}
            textSecondary={textSecondary}
          />

          <Grid item xs={12} md={6} sx={{ mt: { md: 6 } }}>
            <Mission
              msg="Our Vision"
              msgBody="To redefine the future of dining by making gourmet quality
                accessible to everyone, anywhere, anytime."
              cardBg={cardBg}
              theme={theme}
              textSecondary={textSecondary}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ===== STATS ===== */}
      <Box
        sx={{
          bgcolor: isDark ? "rgba(255,255,255,0.02)" : "grey.50", // خلفية أنعم في الدارك مود
          py: 10,
          mb: 12,
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {stats.map((stat, i) => (
              <Grid
                key={i}
                item
                xs={6}
                sm={4}
                md={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 4 },
                    textAlign: "center",
                    borderRadius: 5,
                    bgcolor: isDark ? "background.paper" : "white",
                    border: "1px solid",
                    borderColor: "divider",
                    width: "100%",
                    maxWidth: "280px",
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 1,
                      "& svg": { fontSize: { xs: "1.8rem", md: "2.5rem" } },
                    }}
                  >
                    {stat.icon}
                  </Box>

                  <Typography
                    variant="h3"
                    fontWeight="900"
                    sx={{ fontSize: { xs: "1.4rem", md: "2.5rem" } }}
                  >
                    {stat.static ? (
                      stat.number
                    ) : (
                      <Counter value={stat.number} />
                    )}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "0.7rem", md: "0.9rem" },
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* ===== TEAM SECTION ===== */}
      <TeamSec teamMembers={teamMembers} />
    </Box>
  );
}
