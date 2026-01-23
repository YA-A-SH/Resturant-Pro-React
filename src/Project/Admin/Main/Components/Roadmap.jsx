import {
  AddLocationAlt,
  AutoAwesome,
  Engineering,
  RocketLaunch,
} from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";

export default function Roadmap({ isDark }) {
  const theme = useTheme();

  const ideas = [
    {
      title: "New Branch: Dubai Mall",
      desc: "Expanding ZEUS to the heart of Dubai by Q3 2026.",
      icon: <AddLocationAlt />,
      color: theme.palette.admin.main,
    },
    {
      title: "Master Chef Recruitment",
      desc: "Hiring a 3-Michelin star chef for the Italian section.",
      icon: <Engineering />,
      color: "#F59E0B",
    },
    {
      title: "AI Ordering System",
      desc: "Implementing smart voice recognition for table orders.",
      icon: <AutoAwesome />,
      color: "#10B981",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        borderRadius: "40px",
        position: "relative",
        bgcolor: isDark ? "rgba(18, 18, 20, 0.4)" : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(30px)",
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        p: { xxs: 2, xs: 3, md: 6 },
        overflow: "hidden",
      }}
    >
      {/* Decorative Gradient Line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: theme.palette.admin.gradient,
        }}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, letterSpacing: "-1.5px", mb: 1 }}
          >
            Future Vision
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={500}>
            The next chapter of the ZEUS culinary legacy.
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: "20px",
            background: theme.palette.admin.gradient,
            color: "white",
            boxShadow: `0 10px 20px ${theme.palette.admin.main}40`,
          }}
        >
          <RocketLaunch fontSize="large" />
        </Box>
      </Stack>

      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ideas.map((idea, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: "32px",
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                border: "1px solid",
                borderColor: "transparent",
                transition: "all 0.4s ease",
                position: "relative",
                "&:hover": {
                  borderColor: idea.color,
                  transform: "translateY(-10px) scale(1.02)",
                  boxShadow: `0 20px 40px ${idea.color}15`,
                },
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: `${idea.color}15`,
                  color: idea.color,
                  mb: 3,
                }}
              >
                {idea.icon}
              </Box>

              <Typography variant="h6" fontWeight={800} gutterBottom>
                {idea.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.8, fontSize: "0.95rem" }}
              >
                {idea.desc}
              </Typography>

              <Typography
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 20,
                  fontSize: "4rem",
                  fontWeight: 900,
                  opacity: 0.03,
                  color: idea.color,
                  userSelect: "none",
                }}
              >
                0{index + 1}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
