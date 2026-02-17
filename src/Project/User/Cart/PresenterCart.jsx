// Lip

import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  DeleteSweep,
  Payment,
  Close,
  ShoppingCartCheckout,
} from "@mui/icons-material";

import { AnimatePresence, motion } from "framer-motion";

// Context

import DialogCont from "./Components/DialogContent";

// Comp

import IsEmpty from "./Components/IsEmpty";
import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { ShowCart } from "@else/Components/Context/MainContext";

const CartPre = React.memo(
  ({ totalPrice, onPay, handelClear, handleClose }) => {
    const { t } = useTranslation();
    const { show, cartItems } = useContext(ShowCart);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const isDark = theme.palette.mode === "dark";
    return (
      <AnimatePresence>
        {show && (
          <Dialog
            open={show}
            onClose={handleClose}
            fullScreen={fullScreen}
            maxWidth="md"
            fullWidth
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, y: fullScreen ? 50 : 100, scale: 0.9 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: fullScreen ? 50 : 100, scale: 0.9 },
              transition: { type: "spring", damping: 25, stiffness: 300 },
              sx: {
                borderRadius: fullScreen ? 0 : "28px",
                minHeight: "70vh",
                overflow: "hidden",
                backgroundColor: isDark
                  ? "rgba(15, 15, 20, 0.85)"
                  : "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }`,
              },
            }}
            aria-label={t("Cart Items")}
          >
            <DialogTitle
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: isDark
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)"
                  : "linear-gradient(to bottom, rgba(0,0,0,0.01), transparent)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <ShoppingCartCheckout color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight="900" letterSpacing={-0.5}>
                  {t("My Cart")}
                </Typography>
              </Box>

              <IconButton
                onClick={handleClose}
                sx={{
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                  "&:hover": { bgcolor: "error.main", color: "white" },
                }}
                aria-label={t("Close Cart")}
              >
                <Close fontSize="small" />
              </IconButton>
            </DialogTitle>

            <Divider sx={{ opacity: 0.5 }} />

            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
              {cartItems.length === 0 ? <IsEmpty /> : <DialogCont />}
            </Box>

            {cartItems.length > 0 && (
              <Box
                sx={{
                  p: 3,
                  bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)",
                  borderTop: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                  }`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                    px: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight="600"
                  >
                    {t("Total Amount:")}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary.main"
                    fontWeight="900"
                  >
                    ${totalPrice.toLocaleString()}
                  </Typography>
                </Box>

                <DialogActions
                  sx={{
                    p: 0,
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Button
                    fullWidth
                    variant="text"
                    color="error"
                    startIcon={<DeleteSweep />}
                    onClick={handelClear}
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "12px",
                      flex: 1,
                      py: 1.5,
                    }}
                    aria-label={t("Clear Cart")}
                  >
                    {t("Clear Cart")}
                  </Button>

                  <Button
                    fullWidth
                    component={motion.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variant="contained"
                    color="primary"
                    startIcon={<Payment />}
                    onClick={onPay}
                    sx={{
                      flex: 2,
                      py: 1.8,
                      borderRadius: "16px",
                      fontSize: "1.1rem",
                      fontWeight: "900",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                      textTransform: "none",
                    }}
                    aria-label={t("Proceed to Checkout")}
                  >
                    {t("Proceed to Checkout")}
                  </Button>
                </DialogActions>
              </Box>
            )}
          </Dialog>
        )}
      </AnimatePresence>
    );
  },
);

export default CartPre;
