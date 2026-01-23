import {
  Box,
  Typography,
  Button,
  IconButton,
  Backdrop,
  useTheme,
  Stack,
} from "@mui/material";
import { Close, WarningAmberRounded, DeleteSweep } from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const DeletePopup = ({ open, handleClose, handleDelete, id, msg1, msg2 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          open={open}
          sx={{
            zIndex: theme.zIndex.modal + 1,
            backdropFilter: "blur(8px)",
            backgroundColor: isDark
              ? "rgba(0,0,0,0.7)"
              : "rgba(255,255,255,0.4)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Box
              sx={{
                width: { xxs: "90vw", sm: 400 },
                background: isDark
                  ? "linear-gradient(135deg, rgba(40,40,40,0.9), rgba(20,20,20,0.95))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,240,0.95))",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }`,
                borderRadius: "28px",
                boxShadow: isDark
                  ? "0 25px 50px -12px rgba(0,0,0,0.5)"
                  : "0 25px 50px -12px rgba(0,0,0,0.15)",
                position: "relative",
                overflow: "hidden",
                p: 4,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  background: theme.palette.error.main,
                  filter: "blur(60px)",
                  opacity: 0.15,
                  zIndex: 0,
                }}
              />

              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  color: "text.secondary",
                }}
              >
                <Close fontSize="small" />
              </IconButton>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "22px",
                    bgcolor: isDark ? "rgba(211, 47, 47, 0.2)" : "#ffebee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    color: "error.main",
                    boxShadow: `0 10px 20px -5px ${theme.palette.error.main}40`,
                  }}
                >
                  <WarningAmberRounded sx={{ fontSize: 40 }} />
                </Box>
              </motion.div>

              <Typography
                variant="h5"
                fontWeight="800"
                gutterBottom
                sx={{ letterSpacing: -0.5 }}
              >
                {msg1}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                {msg2}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={handleClose}
                  sx={{
                    borderRadius: "14px",
                    py: 1.5,
                    fontWeight: "bold",
                    color: "text.secondary",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  Discard
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<DeleteSweep />}
                  sx={{
                    borderRadius: "14px",
                    py: 1.5,
                    fontWeight: "bold",
                    boxShadow: `0 8px 20px ${theme.palette.error.main}50`,
                    "&:hover": {
                      boxShadow: `0 12px 25px ${theme.palette.error.main}70`,
                    },
                  }}
                  onClick={() => {
                    handleDelete(id);
                    handleClose();
                  }}
                >
                  Confirm
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default DeletePopup;
