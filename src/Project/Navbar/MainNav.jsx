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
}) {
  return (
    <>
      <Stack spacing={0.5} sx={{ px: 1.5, pb: 1.5 }}>
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
                py: 1.2,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: isActive ? "800" : "500",
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "primary.contrastText" : "text.primary",
                "&:hover": {
                  bgcolor: isActive
                    ? "primary.dark"
                    : isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  transform: "translateX(5px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </Button>
          );
        })}

        <Divider sx={{ my: 1.5, opacity: 0.6 }} />

        {/* كرت التحكم في اللغة والـ Theme */}
        <Box
          sx={{
            p: 1,
            bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
            borderRadius: 4,
          }}
        >
          {/* Language Selection */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1, px: 1 }}
          >
            <LanguageRounded fontSize="small" color="disabled" />
            <Stack direction="row" spacing={0.5} flexGrow={1}>
              {["AR", "EN"].map((lang) => (
                <Button
                  key={lang}
                  fullWidth
                  size="small"
                  variant="text"
                  sx={{ borderRadius: 2, fontWeight: "bold" }}
                >
                  {lang}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Theme Toggle */}
          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              size="small"
              startIcon={<DarkModeRounded />}
              onClick={() => setMode("dark")}
              sx={{
                borderRadius: 2.5,
                bgcolor: isDark ? "background.paper" : "transparent",
                boxShadow: isDark ? 2 : 0,
              }}
            >
              Dark
            </Button>
            <Button
              fullWidth
              size="small"
              startIcon={<LightModeRounded />}
              onClick={() => setMode("light")}
              sx={{
                borderRadius: 2.5,
                bgcolor: !isDark ? "background.paper" : "transparent",
                boxShadow: !isDark ? 2 : 0,
              }}
            >
              Light
            </Button>
          </Stack>
        </Box>

        <Button
          component={Link}
          to="/logout"
          fullWidth
          startIcon={<LogoutRounded />}
          onClick={closeNav}
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: 3,
            color: "error.main",
            fontWeight: "bold",
            "&:hover": { bgcolor: "error.light", color: "white" },
          }}
        >
          Log out
        </Button>
      </Stack>
    </>
  );
}
