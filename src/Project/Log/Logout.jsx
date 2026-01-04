import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../RTK/MainSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      navigate("/login");
    }, 400);
  };

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
          background: `radial-gradient(circle at top,
            ${theme.palette.primary.main}22,
            ${theme.palette.background.default})`,
        }}
      >
        <Card
          component={motion.div}
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          sx={{
            width: 420,
            borderRadius: 4,
            backdropFilter: "blur(18px)",
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0 0 40px ${theme.palette.primary.main}55`,
            border: `1px solid ${theme.palette.primary.main}22`,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={2} alignItems="center">
              <Box
                component={motion.div}
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${theme.palette.primary.main}22`,
                  boxShadow: `0 0 25px ${theme.palette.primary.main}66`,
                }}
              >
                <LogoutIcon
                  sx={{
                    fontSize: 44,
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>

              <Typography variant="h5" fontWeight={700}>
                Logout ?
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Are you sure you want to logout from your account?
              </Typography>

              <Button
                component={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  py: 1.2,
                  boxShadow: `0 0 20px ${theme.palette.primary.main}77`,
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>

              <Button
                component={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  borderColor: theme.palette.divider,
                  color: "text.primary",
                }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </AnimatePresence>
  );
}
