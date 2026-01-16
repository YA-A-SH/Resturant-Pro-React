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
  StarRounded,
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
  useTheme,
} from "@mui/material";

import { InfoRow, ActionButton } from "./OtherCompForCard'sBase";
import FooterCardBase from "./FooterCardBase";

export default function CardBase({ isDark, data, id }) {
  const theme = useTheme();

  const configs = {
    chef: {
      mainColor: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      label: data?.role || "Master Chef",
      specialInfo: {
        label: "Monthly Salary",
        value: data?.salary || "$4,500",
        icon: <PaymentsRounded />,
      },
    },
    manager: {
      mainColor: theme.palette.admin.main, // لون الأدمن الأساسي (الأزرق النيلي)
      gradient: theme.palette.admin.gradient,
      label: "System Administrator",
      specialInfo: {
        label: "Experience",
        value: `${data?.age || 5} Years`,
        icon: <BadgeRounded />,
      },
    },
    user: {
      mainColor: "#F59E0B", // لون برتقالي/ذهبي للمجتمع
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      label: "Community Member",
      specialInfo: {
        label: "Gender",
        value: data?.gender || "Not Set",
        icon: <WcRounded />,
      },
    },
  }[id] || {
    mainColor: "#6366F1",
    gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    label: "Member",
    specialInfo: { label: "Info", value: "Standard", icon: <StarRounded /> },
  };

  return (
    <Card
      sx={{
        p: 0,
        width: "100%",
        borderRadius: "32px",
        position: "relative",
        overflow: "hidden",
        bgcolor: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.05)",
        boxShadow: isDark
          ? "0 15px 35px rgba(0,0,0,0.2)"
          : "0 15px 35px rgba(148,163,184,0.1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-12px)",
          borderColor: alpha(configs.mainColor, 0.4),
          boxShadow: `0 20px 40px ${alpha(configs.mainColor, 0.15)}`,
          "& .avatar-frame": { transform: "rotate(10deg) scale(1.1)" },
          "& .footer-action": {
            bgcolor: isDark
              ? "rgba(255,255,255,0.03)"
              : alpha(configs.mainColor, 0.03),
          },
        },
      }}
    >
      <Box sx={{ height: 6, width: "100%", background: configs.gradient }} />
      <Box sx={{ p: 3.5 }}>
        {/* Header: Avatar & Name */}
        <Stack direction="row" spacing={2.5} alignItems="center" mb={3}>
          <Box
            className="avatar-frame"
            sx={{
              p: "3px",
              borderRadius: "22px",
              background: configs.gradient,
              transition: "all 0.5s ease",
            }}
          >
            <Avatar
              src={data?.image || data?.img}
              sx={{
                width: 70,
                height: 70,
                borderRadius: "20px",
                border: `3px solid ${isDark ? "#1a1a1c" : "#fff"}`,
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight={900}
              noWrap
              sx={{ letterSpacing: -0.8, mb: 0.5 }}
            >
              {data?.name}
            </Typography>
            <Chip
              label={configs.label}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.65rem",
                fontWeight: 900,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                bgcolor: alpha(configs.mainColor, 0.1),
                color: configs.mainColor,
                border: `1px solid ${alpha(configs.mainColor, 0.2)}`,
              }}
            />
          </Box>
        </Stack>

        {/* Info Rows */}
        <Stack spacing={2}>
          <InfoRow
            icon={<MailRounded />}
            text={data?.email || data?.mail}
            label="Contact"
            isDark={isDark}
          />
          <InfoRow
            icon={<LocationOnRounded />}
            text={data?.city || "Unknown"}
            label="Resident"
            isDark={isDark}
          />

          {/* Highlight Box */}
          <Box
            sx={{
              mt: 1,
              p: 2,
              borderRadius: "20px",
              bgcolor: isDark
                ? "rgba(0,0,0,0.2)"
                : alpha(configs.mainColor, 0.04),
              border: "1px dashed",
              borderColor: alpha(configs.mainColor, 0.3),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  color: configs.mainColor,
                  display: "flex",
                  bgcolor: alpha(configs.mainColor, 0.1),
                  p: 0.8,
                  borderRadius: "10px",
                }}
              >
                {cloneElement(configs.specialInfo.icon, {
                  sx: { fontSize: 20 },
                })}
              </Box>
              <Typography
                variant="caption"
                fontWeight={800}
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
              >
                {configs.specialInfo.label}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              fontWeight={900}
              sx={{ color: configs.mainColor }}
            >
              {configs.specialInfo.value}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* Footer Actions */}
      <FooterCardBase isDark={isDark} id={id} theme={theme} configs={configs} />
    </Card>
  );
}
