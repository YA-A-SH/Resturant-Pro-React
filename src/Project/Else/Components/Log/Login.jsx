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
import { motion } from "framer-motion";
import ContAdminDialog from "./Components/ContDialogAdmin";
import { useTranslation } from "react-i18next";
import React from "react";

const Login = React.memo(
  ({ setOpenReset, openReset, setOpenAdmin, openAdmin }) => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const currentLanguage = i18n.language;

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
          p: { sm: 2 },
        }}
      >
        <Fade in timeout={800}>
          <Box
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            sx={{
              maxWidth: { xxs: 500, ms: "98%", md: 900 },
              width: { xxs: "100%", sm: 1 },
              p: { xs: 3, sm: 5 },
              bgcolor: isDark
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(255, 255, 255, 0.8)",
              borderRadius: { xxs: "52px 52px 0 0", ss: "32px" },
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)"
              }`,
              boxShadow: isDark
                ? "0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,152,0,0.1)"
                : "0 20px 40px rgba(0,0,0,0.05)",
              textAlign: "center",
              mt: { xxs: 7, ss: 3 },
              mb: { ss: 3 },
            }}
          >
            {/* Header  */}
            <Box>
              <Typography
                variant="h4"
                fontWeight="1000"
                mb={1}
                sx={{
                  background: `linear-gradient(45deg, #fee76a, #fee76a, ${theme.palette.primary.light}, #fee76a , #fee76a)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: -1,
                  fontSize: { ss: "3rem", ms: "4rem" },
                }}
              >
                {t("Welcome Back")}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mb={4}
                sx={{ fontWeight: 500 }}
              >
                {t("desc 7")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: { ms: "flex" },
                justifyContent: { ms: "center" },
                alignItems: { ms: "center" },
                gap: { ms: 10 },
              }}
            >
              <Box>
                {/* Email Login Form */}
                <EmailLogin />

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
                  {t("Forgot password?")}{" "}
                  <span
                    style={{
                      color: theme.palette.primary.custom,
                      marginLeft: currentLanguage === "ar" ? "" : "4px",
                      marginRight: currentLanguage === "ar" ? "10px" : "",
                    }}
                  >
                    {t("Reset here")}
                  </span>
                </Button>

                {/* Divider Custom */}
                <Divider
                  sx={{
                    my: 2,
                    "&::before, &::after": { borderColor: "divider" },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.disabled", px: 1, fontWeight: 700 }}
                  >
                    {t("OR CONTINUE WITH")}
                  </Typography>
                </Divider>

                {/* Social Login Buttons */}
                <FacGoogleLogin />

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
                    {t("STAFF ONLY")}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setOpenAdmin(true)}
                    sx={{
                      color: theme.palette.primary.custom,
                      fontWeight: 800,
                      borderRadius: "10px",
                      px: 3,
                      bgcolor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                      "&:hover": { bgcolor: "primary.custom", color: "#fff" },
                    }}
                  >
                    {t("Admin Page's")}
                  </Button>
                </Box>
              </Box>
              <Box display={{ xxs: "none", ms: "block" }}>
                <Box
                  component="img"
                  src="/zeusHeroPhoto.webp"
                  alt="Logo"
                  sx={{
                    borderRadius: 15,
                    height: {
                      ms: 520,
                      md: 580,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Dialogs */}
        <ContAdminDialog open={openAdmin} setOpen={setOpenAdmin} />
        <DialogReset open={openReset} setOpen={setOpenReset} />
      </Box>
    );
  },
);
export default Login;
