import { AddLocationAlt, AutoAwesome, Engineering } from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

export default function Roadmap({ isDark, GRADIENTS }) {
  
  const ideas = [
    {
      title: "New Branch: Dubai Mall",
      desc: "Expanding ZEUS to the heart of Dubai by Q3 2026.",
      icon: <AddLocationAlt />,
      color: "#6366F1",
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
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "30px",
          bgcolor: isDark
            ? "rgba(30, 41, 59, 0.5)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          p: 4,
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.3)"
            : "0 20px 50px rgba(148,163,184,0.1)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, letterSpacing: "-0.5px" }}
          >
            Roadmap & Innovations
          </Typography>
          <Box
            sx={{
              p: 1,
              borderRadius: "12px",
              background: GRADIENTS.primary,
              color: "white",
              display: "flex",
            }}
          >
            <AutoAwesome />
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {ideas.map((idea, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: "20px",
                  bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                  borderLeft: `6px solid ${idea.color}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    bgcolor: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      color: idea.color,
                      bgcolor: `${idea.color}15`,
                      width: "fit-content",
                      p: 1,
                      borderRadius: "10px",
                      display: "flex",
                    }}
                  >
                    {idea.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={800}
                      gutterBottom
                    >
                      {idea.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {idea.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
