import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
  Stack,
  alpha,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@user/RTK/MainSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect } from "react";
import { IsAdminContext } from "../Context/MainContext";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);
  const isDark = theme.palette.mode === "dark";

  const mainColor = isAdmin
    ? theme.palette.admin.main
    : theme.palette.primary.main;

  const handleLogout = () => {
    dispatch(logout());
    setIsAdmin(false);
    setTimeout(() => {
      navigate("/login");
    }, 400);
  };

  useEffect(() => {
    document.title = t("Zeus Restaurant | Logout");
  }, []);

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDark
            ? `radial-gradient(circle at center, ${alpha(mainColor, 0.12)} 0%, #0a0a0c 100%)`
            : `radial-gradient(circle at center, ${alpha(mainColor, 0.05)} 0%, #f4f6f8 100%)`,
        }}
      >
        <Card
          component={motion.div}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          sx={{
            width: { xs: "90%", sm: 400 },
            borderRadius: "32px",
            backdropFilter: "blur(20px)",
            backgroundColor: isDark
              ? "rgba(22, 22, 26, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            boxShadow: `0 20px 50px ${alpha(mainColor, isDark ? 0.3 : 0.1)}`,
            border: "1px solid",
            borderColor: alpha(mainColor, 0.2),
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 140,
              height: 140,
              background: alpha(mainColor, 0.15),
              filter: "blur(40px)",
              borderRadius: "50%",
            }}
          />

          <CardContent
            sx={{ p: { xs: 4, sm: 6 }, position: "relative", zIndex: 1 }}
          >
            <Stack spacing={3} alignItems="center">
              <Box
                component={motion.div}
                whileHover={{ rotate: -10, scale: 1.05 }}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: alpha(mainColor, 0.1),
                  color: mainColor,
                }}
              >
                <LogoutIcon sx={{ fontSize: 40 }} />
              </Box>

              <Box textAlign="center">
                <Typography variant="h5" fontWeight={900} gutterBottom>
                  {t("Logout?")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isAdmin
                    ? t("Admin session will be terminated. Continue?")
                    : t("Are you sure you want to logout from your account?")}
                </Typography>
              </Box>

              <Stack direction="column" spacing={2} width="100%">
                <Button
                  component={motion.button}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  variant="contained"
                  fullWidth
                  onClick={handleLogout}
                  sx={{
                    bgcolor: mainColor,
                    py: 1.5,
                    borderRadius: "14px",
                    fontWeight: 800,
                    boxShadow: `0 8px 20px ${alpha(mainColor, 0.4)}`,
                    "&:hover": {
                      bgcolor: mainColor,
                      filter: "brightness(1.1)",
                    },
                  }}
                >
                  {t("Yes, Log me out")}
                </Button>

                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate(-1)}
                  sx={{
                    py: 1.2,
                    borderRadius: "14px",
                    color: "text.secondary",
                    fontWeight: 700,
                    "&:hover": { bgcolor: alpha(mainColor, 0.05) },
                  }}
                >
                  {t("Cancel")}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </AnimatePresence>
  );
}
