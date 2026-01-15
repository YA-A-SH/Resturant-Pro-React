import { cloneElement } from "react";
import {
  BlockRounded,
  MailRounded,
  VerifiedUserRounded,
  ArrowForwardIosRounded,
  LocationOnRounded,
  BadgeRounded,
  PaymentsRounded,
  WcRounded,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import { InfoRow, ActionButton } from "./OtherCompForCard'sBase";
export default function CardBase({ isDark, data, id }) {
  const configs = {
    chef: {
      mainColor: "#00d2ff",
      gradient: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
      label: data?.role || "Specialist Chef",
      specialInfo: {
        label: "Salary",
        value: data?.salary,
        icon: <PaymentsRounded />,
      },
    },
    manager: {
      mainColor: "#ff9966",
      gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
      label: "Administrator",
      specialInfo: {
        label: "Experience",
        value: `${data?.age} Years`,
        icon: <BadgeRounded />,
      },
    },
    user: {
      mainColor: "#00f260",
      gradient: "linear-gradient(135deg, #0575E6 0%, #00f260 100%)",
      label: "Community Member",
      specialInfo: {
        label: "Gender",
        value: data?.gender,
        icon: <WcRounded />,
      },
    },
  }[id];

  const currentConfig = configs || configs.user;

  return (
    <Card
      sx={{
        p: 0,
        width: "100%",
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
        bgcolor: isDark ? alpha("#121212", 0.6) : "#ffffff",
        backdropFilter: "blur(15px)",
        border: `1px solid ${
          isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.05)
        }`,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: isDark
            ? `0 20px 40px ${alpha(currentConfig.mainColor, 0.15)}`
            : `0 20px 40px ${alpha("#000", 0.1)}`,
          "& .footer-action": { bgcolor: alpha(currentConfig.mainColor, 0.08) },
        },
      }}
    >
      {/* Top Accent Line */}
      <Box
        sx={{ height: 5, width: "100%", background: currentConfig.gradient }}
      />

      <Box sx={{ p: 3 }}>
        {/* Header Section */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
          <Box
            className="avatar-frame"
            sx={{
              p: "2px",
              borderRadius: "18px",
              background: currentConfig.gradient,
              transition: "all 0.8s ease",
            }}
          >
            <Avatar
              src={data?.image || data?.img}
              sx={{
                width: 65,
                height: 65,
                borderRadius: "16px",
                border: `2px solid ${isDark ? "#121212" : "#fff"}`,
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight={800}
              noWrap
              sx={{ letterSpacing: -0.5, mb: 0.5 }}
            >
              {data?.name}
            </Typography>
            <Chip
              label={currentConfig.label}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 800,
                textTransform: "uppercase",
                bgcolor: alpha(currentConfig.mainColor, 0.1),
                color: currentConfig.mainColor,
                border: `1px solid ${alpha(currentConfig.mainColor, 0.2)}`,
              }}
            />
          </Box>
        </Stack>

        {/* Info Grid */}
        <Stack spacing={1.5}>
          <InfoRow
            icon={<MailRounded />}
            text={data?.email || data?.mail}
            label="Email"
            isDark={isDark}
          />
          <InfoRow
            icon={<LocationOnRounded />}
            text={data?.city}
            label="Location"
            isDark={isDark}
          />

          {/* Dynamic Highlight Info */}
          <Box
            sx={{
              mt: 1,
              p: 1.5,
              borderRadius: "16px",
              bgcolor: isDark
                ? alpha("#fff", 0.03)
                : alpha(currentConfig.mainColor, 0.05),
              border: `1px solid ${
                isDark ? alpha("#fff", 0.05) : "transparent"
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ color: currentConfig.mainColor, display: "flex" }}>
                {cloneElement(currentConfig.specialInfo.icon, {
                  sx: { fontSize: 18 },
                })}
              </Box>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
              >
                {currentConfig.specialInfo.label}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              fontWeight={900}
              sx={{ color: currentConfig.mainColor }}
            >
              {currentConfig.specialInfo.value}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Footer Actions */}
      <Stack
        className="footer-action"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 2,
          transition: "0.3s",
          borderTop: `1px solid ${
            isDark ? alpha("#fff", 0.05) : alpha("#000", 0.05)
          }`,
        }}
      >
        <Stack direction="row" spacing={1}>
          {id === "manager" ? (
            <Tooltip title="Admin Panel Access">
              <AdminPanelSettingsRounded
                sx={{ color: "text.disabled", fontSize: 28 }}
              />
            </Tooltip>
          ) : (
            <>
              <ActionButton
                icon={<VerifiedUserRounded />}
                color="#4caf50"
                title="Verify"
              />
              <ActionButton
                icon={<BlockRounded />}
                color="#f44336"
                title="Restrict"
              />
            </>
          )}
        </Stack>

        <Button
          variant="contained"
          size="small"
          disableElevation
          endIcon={
            <ArrowForwardIosRounded sx={{ fontSize: "10px !important" }} />
          }
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 800,
            px: 2,
            background: isDark ? "#fff" : "#1A1A1A",
            color: isDark ? "#000" : "#fff",
            "&:hover": {
              background: currentConfig.gradient,
              color: "#fff",
              transform: "scale(1.05)",
            },
          }}
        >
          Details
        </Button>
      </Stack>
    </Card>
  );
}
