import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const ButtonsAllComp = React.memo(({ selectedType, setSelectedType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "fit-content" },
        m: "0 auto 50px auto",
        p: 0.8,
        borderRadius: "100px",
        bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
        display: "flex",
        gap: 1,
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "transparent"}`,
        justifyContent: { xs: "space-evenly" },
        overflowX: { xs: "auto", sm: "visible" },
      }}
    >
      {MEAL_TYPES.map((type) => {
        const isActive = selectedType === type;

        return (
          <Button
            key={type}
            variant={isActive ? "contained" : "text"}
            onClick={() => setSelectedType(type)}
            sx={{
              borderRadius: "100px",
              px: { xs: 2.5, sm: 5 },
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              transition: "0.4s",
              whiteSpace: "nowrap",
              boxShadow: isActive ? theme.shadows[4] : "none",
              color: isActive ? "#fff" : "text.secondary",
              "&:hover": {
                bgcolor: isActive
                  ? "primary.main"
                  : isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                transform: "translateY(-1px)",
              },
            }}
          >
            {t(type)}
          </Button>
        );
      })}
    </Box>
  );
});

export default ButtonsAllComp;
