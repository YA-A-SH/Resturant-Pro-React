import { alpha, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function EliteLoader({ color = "#10B981" }) {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: (theme) =>
            theme.palette.mode === "dark" ? "#0a0a0c" : "#f8fafc",
        }}
      >
        <Box sx={{ position: "relative", width: 120, height: 120 }}>
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                borderRadius: ["30%", "50%", "30%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              sx={{
                position: "absolute",
                inset: 0,
                border: `2px solid ${alpha(color, 0.2 - i * 0.05)}`,
                boxShadow: i === 0 ? `0 0 20px ${alpha(color, 0.2)}` : "none",
              }}
            />
          ))}

          <Box
            component={motion.div}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color,
              fontSize: "2rem",
              fontWeight: 900,
            }}
          >
            {t("ZEUS")}
          </Box>
        </Box>

        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          sx={{
            mt: 4,
            fontWeight: 800,
            letterSpacing: 2,
            color: "text.secondary",
            fontSize: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          {t("Preparing Culinary Profile...")}
        </Typography>
      </Box>
    </>
  );
}
