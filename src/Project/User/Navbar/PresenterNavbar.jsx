import { Box, Typography, Stack, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import MainNav from "./Components/MainNav";

export default function PreNav({
  showNav,
  setMode,
  menuItems,
  closeNav,
  isDark,
  location,
  isAdmin,
}) {
  return (
    <AnimatePresence>
      {showNav && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 0,
            scale: 0,
          }}
          sx={{
            position: "fixed",
            top: "85px",
            right: "10px",
            width: 280,
            bgcolor: isDark
              ? "rgba(30, 30, 30, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            borderRadius: 5,
            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
            }`,
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.5)"
              : "0 20px 50px rgba(0,0,0,0.1)",
            zIndex: 1300,
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 2, pb: 1 }}
          >
            <Typography variant="h4" fontWeight="900" color="primary">
              {isAdmin ? "Admin Menu" : "Menu"}
            </Typography>
            <IconButton size="small" onClick={closeNav} aria-label="CloseNav">
              <CloseRounded fontSize="inherit" />
            </IconButton>
          </Stack>

          <MainNav
            menuItems={menuItems}
            closeNav={closeNav}
            isDark={isDark}
            setMode={setMode}
            location={location}
          />
        </Box>
      )}
    </AnimatePresence>
  );
}
