import { Card, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const QuickStatusCards = React.memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
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
            label: t("Total Users"),
            value: "55,930",
            color: theme.palette.admin.main,
          },
          { label: t("Active Now"), value: "8,540", color: "#10B981" },
          { label: t("Restricted"), value: "120", color: "#EF4444" },
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
    </>
  );
});

export default QuickStatusCards;
