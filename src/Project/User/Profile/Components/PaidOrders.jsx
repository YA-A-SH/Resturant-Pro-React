import {
  ShoppingBagOutlined,
  ReceiptLongRounded,
  DeleteSweepRounded,
  DeleteOutlineRounded,
  EditNoteRounded,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Typography,
  useTheme,
  Stack,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const PaidOrder = React.memo(
  ({
    paid,
    setDeletePopupInfo,
    handleClose,
    handleDelete,
    handleDeleteItem,
  }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { t } = useTranslation();

    const calculateOrderTotal = useCallback((items) => {
      return items
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    }, []);

    const handelCancelOrder = (order) => {
      setDeletePopupInfo({
        id: order.id,
        open: true,
        handleClose: handleClose,
        handleDelete: handleDelete,
        msg1: t("Confirm Action"),
        msg2: t("desc 9"),
      });
    };
    return (
      <Box sx={{ width: "95%", mx: "auto", mt: 10, mb: 5 }}>
        {/* Header  */}
        <Stack direction="column" alignItems="center" spacing={1} mb={6}>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{
              letterSpacing: -1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("Active Orders")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("Manage your orders and individual items")}
          </Typography>
        </Stack>

        {paid.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              bgcolor: "action.hover",
              borderRadius: 10,
              border: "2px dashed",
              borderColor: "divider",
            }}
          >
            <ShoppingBagOutlined
              sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {t("No orders found")}
            </Typography>
          </Box>
        ) : (
          <Stack spacing={5}>
            <AnimatePresence mode="popLayout">
              {paid.map((order, index) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      borderRadius: "32px",
                      bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                      }`,
                      overflow: "hidden",
                      boxShadow: isDark
                        ? "0 30px 60px rgba(0,0,0,0.4)"
                        : "0 15px 35px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* --- Header--- */}
                    <Box
                      sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: isDark
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 48,
                            height: 48,
                            boxShadow: `0 4px 15px ${theme.palette.primary.main}40`,
                          }}
                        >
                          <ReceiptLongRounded />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="900"
                          >
                            {t("ORDER GROUP")}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight="900"
                            sx={{ lineHeight: 1 }}
                          >
                            #{order.id.slice(0, 8).toUpperCase()}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="Processing"
                          color="warning"
                          size="small"
                          sx={{ fontWeight: 800, borderRadius: "8px" }}
                        />
                        <Tooltip title={t("Cancel Entire Order")}>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handelCancelOrder(order)}
                            sx={{
                              bgcolor: "error.soft",
                              "&:hover": {
                                bgcolor: "error.main",
                                color: "#fff",
                              },
                            }}
                          >
                            <DeleteSweepRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>

                    <Box sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        {order.cartItems.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              p: 2,
                              borderRadius: "20px",
                              bgcolor: isDark
                                ? "rgba(255,255,255,0.03)"
                                : "rgba(0,0,0,0.01)",
                              border: `1px solid ${
                                isDark ? "transparent" : "rgba(0,0,0,0.04)"
                              }`,
                              transition: "0.3s",
                              "&:hover": {
                                transform: "scale(1.01)",
                                bgcolor: isDark
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.03)",
                              },
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={item.image}
                                variant="rounded"
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "15px",
                                }}
                              />
                              <Box>
                                <Typography variant="body1" fontWeight="900">
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {t("Qty:")} {item.quantity} • ${item.price}
                                </Typography>
                              </Box>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                              <Tooltip title={t("Edit Item")}>
                                <IconButton
                                  size="small"
                                  sx={{
                                    color: "primary.main",
                                    bgcolor: "primary.soft",
                                  }}
                                >
                                  <EditNoteRounded />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title={t("Remove Item")}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    setDeletePopupInfo({
                                      id: item.id,
                                      open: true,
                                      handleClose: handleClose,
                                      handleDelete: () =>
                                        handleDeleteItem(order.id, item.id),
                                      msg1: t("Confirm Action"),
                                      msg2: t(
                                        "Are you sure you want to delete this dish  ? This action cannot be undone.",
                                      ),
                                    });
                                  }}
                                  sx={{ bgcolor: "error.soft" }}
                                >
                                  <DeleteOutlineRounded />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Box
                      sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color="text.secondary"
                      >
                        {t("Total Payment")}
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight="1000"
                        color="primary.main"
                      >
                        ${calculateOrderTotal(order.cartItems)}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        )}
      </Box>
    );
  },
);
export default PaidOrder;
