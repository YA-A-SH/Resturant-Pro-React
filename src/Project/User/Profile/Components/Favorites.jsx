import { Favorite, HeartBrokenRounded } from "@mui/icons-material";
import { Box, Card, IconButton, Typography, useTheme } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

const FavoriteComp = React.memo(({ fav, toggleFavorite }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ width: "95%", mx: "auto", mt: 8 }}>
      <Typography
        variant="h4"
        fontWeight="900"
        mb={4}
        textAlign="center"
        sx={{ letterSpacing: -1 }}
      >
        ❤️ {t("Favorite Collection")}
      </Typography>

      {fav.length === 0 ? (
        // ===== Empty State =====
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              borderRadius: 8,
              bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
              border: `1px dashed ${theme.palette.divider}`,
            }}
          >
            <HeartBrokenRounded
              sx={{ fontSize: 80, color: "text.disabled", mb: 2, opacity: 0.5 }}
            />
            <Typography variant="h6" fontWeight={700} color="text.secondary">
              {t("Your heart is empty")}
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
              {t("Start adding some flavors to your favorites!")}
            </Typography>
          </Box>
        </motion.div>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            p: 2,
            pb: 4,
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "primary.main",
              borderRadius: 10,
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {fav.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 50, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ scrollSnapAlign: "center" }}
              >
                <Card
                  sx={{
                    minWidth: 280,
                    borderRadius: "28px",
                    overflow: "hidden",
                    position: "relative",
                    bgcolor: "background.paper",
                    boxShadow: isDark
                      ? "0 20px 40px rgba(0,0,0,0.4)"
                      : "0 20px 40px rgba(0,0,0,0.06)",
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                    }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={item.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <IconButton
                      onClick={() => toggleFavorite(item.id)}
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        backdropFilter: "blur(10px)",
                        bgcolor: "rgba(255, 255, 255, 0.7)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        "&:hover": { bgcolor: "#fff" },
                      }}
                    >
                      <Favorite sx={{ color: "#ff1744" }} />
                    </IconButton>
                  </Box>

                  {/* Details */}
                  <Box sx={{ p: 2.5, textAlign: "center" }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="800"
                      noWrap
                      sx={{ color: "text.primary", letterSpacing: -0.5 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 600,
                        opacity: 0.7,
                      }}
                    >
                      {t("Premium Selection")}
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
});
export default FavoriteComp;
