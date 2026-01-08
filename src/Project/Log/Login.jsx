import {
  Box,
  Button,
  Typography,
  Fade,
  Divider,
  useTheme,
} from "@mui/material";
import DialogReset from "./Components/DialogReset";
import FacGoogleLogin from "./Components/Facebook&GoogleLogin";
import EmailLogin from "./Components/EmailLogin";
import ContAdmin from "./Components/ContDialogAdmin";
import { motion } from "framer-motion";

export default function Login({
  user,
  setUser,
  handleEmailLogin,
  mailLoading,
  setOpenReset,
  googleLoading,
  googleError,
  handleGoogleLogin,
  openReset,
  setOpenAdmin,
  openAdmin,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "radial-gradient(circle at top left, #1a1a1a 0%, #000000 100%)"
          : "radial-gradient(circle at top left, #fff7ed 0%, #ffedd5 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Box
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          sx={{
            width: 1,
            maxWidth: 420,
            p: { xs: 3, sm: 5 },
            bgcolor: isDark
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: "32px",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)"
            }`,
            boxShadow: isDark
              ? "0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,152,0,0.1)"
              : "0 20px 40px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          {/* Logo or Icon could go here */}

          <Typography
            variant="h4"
            fontWeight="1000"
            mb={1}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, #ff9800)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -1,
            }}
          >
            Welcome Back 🍽️
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={4}
            sx={{ fontWeight: 500 }}
          >
            Delicious meals are just a login away
          </Typography>

          {/* Email Login Form */}
          <EmailLogin
            user={user}
            setUser={setUser}
            handleEmailLogin={handleEmailLogin}
            mailLoading={mailLoading}
          />

          <Button
            size="small"
            onClick={() => setOpenReset(true)}
            sx={{
              mt: 1,
              textTransform: "none",
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Forgot password?{" "}
            <span
              style={{ color: theme.palette.primary.main, marginLeft: "4px" }}
            >
              Reset here
            </span>
          </Button>

          {/* Divider Custom */}
          <Divider
            sx={{ my: 4, "&::before, &::after": { borderColor: "divider" } }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", px: 1, fontWeight: 700 }}
            >
              OR CONTINUE WITH
            </Typography>
          </Divider>

          {/* Social Login Buttons */}
          <FacGoogleLogin
            googleLoading={googleLoading}
            googleError={googleError}
            handleGoogleLogin={handleGoogleLogin}
          />

          {/* Admin Section (Stylish Footer) */}
          <Box
            sx={{
              mt: 4,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ fontWeight: 600 }}
            >
              STAFF ONLY
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => setOpenAdmin(true)}
              sx={{
                fontWeight: 800,
                borderRadius: "10px",
                px: 3,
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                "&:hover": { bgcolor: "primary.main", color: "#fff" },
              }}
            >
              Admin Dashboard
            </Button>
          </Box>
        </Box>
      </Fade>

      {/* Dialogs */}
      <ContAdmin open={openAdmin} setOpen={setOpenAdmin} />
      <DialogReset open={openReset} setOpen={setOpenReset} />
    </Box>
  );
}
