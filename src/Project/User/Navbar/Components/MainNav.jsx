import {
  DarkModeRounded,
  LanguageRounded,
  LightModeRounded,
  LogoutRounded,
} from "@mui/icons-material";
import { Box, Button, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function MainNav({
  menuItems,
  location,
  closeNav,
  isDark,
  setMode,
  isAdmin,
}) {
  const activeColor = isAdmin ? "admin.main" : "primary.main";
  const activeGradient = isAdmin
    ? "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)"
    : "linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)";

  return (
    <Stack spacing={0.8} sx={{ px: 2, pb: 2.5 }}>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.label}
            component={Link}
            to={item.path}
            fullWidth
            onClick={closeNav}
            startIcon={item.icon}
            sx={{
              justifyContent: "flex-start",
              px: 2,
              py: 1.5,
              borderRadius: "14px",
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: isActive ? 700 : 500,
              background: isActive ? activeGradient : "transparent",
              color: isActive ? "#fff" : "text.primary",
              boxShadow: isActive
                ? `0 8px 20px -6px ${isAdmin ? "#6366f199" : "#b8860b99"}`
                : "none",
              "&:hover": {
                background: isActive ? activeGradient : "action.hover",
                transform: "translateX(8px)",
                color: isActive ? "#fff" : activeColor,
              },
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {item.label}
          </Button>
        );
      })}

      <Divider
        sx={{
          my: 2,
          opacity: 0.5,
          borderColor: isAdmin ? "admin.main" : "primary.main",
        }}
      />

      {/* Control Panel (Mode & Lang) */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
          borderRadius: "18px",
        }}
      >
        {/* Language Selection */}
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          {["AR", "EN"].map((lang) => (
            <Button
              key={lang}
              fullWidth
              size="small"
              variant={lang === "EN" ? "contained" : "text"} // مثال لتحديد اللغة النشطة
              sx={{
                borderRadius: "10px",
                fontWeight: "800",
                bgcolor: lang === "EN" ? activeColor : "transparent",
                "&:hover": {
                  bgcolor: lang === "EN" ? activeColor : "action.hover",
                },
              }}
            >
              {lang}
            </Button>
          ))}
        </Stack>

        {/* Theme Toggle */}
        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            onClick={() => setMode("dark")}
            startIcon={<DarkModeRounded />}
            sx={{
              borderRadius: "12px",
              bgcolor: isDark ? "background.paper" : "transparent",
              color: isDark ? activeColor : "text.secondary",
              boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
              border: isDark ? "1px solid" : "none",
              borderColor: activeColor,
            }}
          >
            Dark
          </Button>
          <Button
            fullWidth
            onClick={() => setMode("light")}
            startIcon={<LightModeRounded />}
            sx={{
              borderRadius: "12px",
              bgcolor: !isDark ? "background.paper" : "transparent",
              color: !isDark ? activeColor : "text.secondary",
              boxShadow: !isDark ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
              border: !isDark ? "1px solid" : "none",
              borderColor: activeColor,
            }}
          >
            Light
          </Button>
        </Stack>
      </Box>

      {/* Logout */}
      <Button
        component={Link}
        to="/logout"
        fullWidth
        startIcon={<LogoutRounded />}
        onClick={closeNav}
        sx={{
          mt: 1,
          py: 1.5,
          borderRadius: "14px",
          color: "error.main",
          fontWeight: "800",
          border: "1px solid transparent",
          "&:hover": {
            bgcolor: "rgba(239, 68, 68, 0.08)",
            borderColor: "error.light",
            transform: "scale(1.02)",
          },
          transition: "0.2s",
        }}
      >
        Sign Out
      </Button>
    </Stack>
  );
}
