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
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          sx={{
            position: "fixed",
            top: isAdmin ? "90px" : "70px",
            right: "10px",
            width: 300,
            bgcolor: "background.glass",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            boxShadow: isDark
              ? "0 25px 50px -12px rgba(0,0,0,0.7)"
              : "0 25px 50px -12px rgba(0,0,0,0.15)",
            zIndex: 1300,
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 1.5, pb: 1.5 }}
          >
            <Typography
              variant="h6"
              fontWeight="900"
              sx={{
                color: isAdmin ? "admin.main" : "primary.main",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {isAdmin ? "Admin Suite" : "Guest Menu"}
            </Typography>
            <IconButton
              size="small"
              onClick={closeNav}
              sx={{ bgcolor: "background.paper", boxShadow: 1 }}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </Stack>

          <MainNav
            menuItems={menuItems}
            closeNav={closeNav}
            isDark={isDark}
            setMode={setMode}
            location={location}
            isAdmin={isAdmin}
          />
        </Box>
      )}
    </AnimatePresence>
  );
}
