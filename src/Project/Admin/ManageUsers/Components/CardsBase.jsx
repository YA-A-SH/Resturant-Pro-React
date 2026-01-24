import { cloneElement, useContext, useState } from "react";
import {
  MailRounded,
  LocationOnRounded,
  BadgeRounded,
  PaymentsRounded,
  WcRounded,
  StarRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import { InfoRow } from "./OtherCompForCard'sBase";
import FooterCardBase from "./FooterCardBase";
import EditSalaryPopup from "./EditSalaryPopup";
import DeleteChefPopup from "./DeleteChefPopup";
import SnackbarComp from "../../../Else/Components/SnackbarComp";
import { OpenSnackbarContext } from "../../../User/Context/MainContext";

export default function CardBase({ isDark, data, id }) {
  // Hooks
  const { setOpenSnackbar } = useContext(OpenSnackbarContext);

  const [openEditSalaryPopup, setOpenEditSalaryPopup] = useState(false);
  const [openDeleteChefPopup, setOpenDeleteChefPopup] = useState(false);
  const theme = useTheme();

  // Variables

  const isUserVerified = id === "user" && data?.isVerified;
  const isBlocked = data?.isBlocked;
  const configs = {
    chef: {
      mainColor: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      label: data?.role || "Master Chef",
      specialInfo: {
        label: "Monthly Salary : ",
        value: ` ${data?.salary}$`,
        icon: <PaymentsRounded />,
      },
    },
    manager: {
      mainColor: theme.palette.admin.main,
      gradient: theme.palette.admin.gradient,
      label: "System Administrator",
      specialInfo: {
        label: "Experience : ",
        value: ` ${data?.age || 5} Years`,
        icon: <BadgeRounded />,
      },
    },
    user: {
      mainColor: isBlocked ? "#ef4444" : isUserVerified ? "#10B981" : "#F59E0B",
      gradient: isBlocked
        ? "linear-gradient(135deg, #ef4444 0%, #991b1b 100%)"
        : isUserVerified
          ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
          : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      label: isBlocked
        ? "Blocked User"
        : isUserVerified
          ? "Verified Member"
          : "Community Member",
      specialInfo: {
        label: "Gender : ",
        value: data?.gender || "Not Set",
        icon: <WcRounded />,
      },
    },
  }[id] || {
    mainColor: "#6366F1",
    label: "Member",
    gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
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
        borderColor: isBlocked
          ? alpha("#ef4444", 0.3)
          : isDark
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.05)",
        boxShadow: isDark
          ? "0 15px 35px rgba(0,0,0,0.2)"
          : "0 15px 35px rgba(148,163,184,0.1)",
        transition: "0.7s",
        filter: isBlocked ? "saturate(0.8)" : "none",
        "&:hover": {
          transform: "translateY(-12px)",
          borderColor: alpha(configs.mainColor, 0.4),
          boxShadow: `0 20px 40px ${alpha(configs.mainColor, 0.25)}`,
          "& .avatar-frame": { transform: "rotate(8deg) scale(1.05)" },
        },
      }}
    >
      <Box sx={{ height: 6, width: "100%", background: configs.gradient }} />
      <Box sx={{ p: 3.5 }}>
        {/* Header Section */}
        <Stack direction="row" spacing={2.5} alignItems="center" mb={3}>
          <Box
            className="avatar-frame"
            sx={{
              p: "3px",
              borderRadius: "22px",
              background: configs.gradient,
              position: "relative",
              transition: "0.5s ease",
            }}
          >
            <Avatar
              src={data?.image || data?.img}
              sx={{
                width: 70,
                height: 70,
                borderRadius: "20px",
                border: `3px solid ${isDark ? "#1a1a1c" : "#fff"}`,
                filter: isBlocked ? "grayscale(100%)" : "none",
                opacity: isBlocked ? 0.6 : 1,
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography
                variant="h6"
                fontWeight={900}
                noWrap
                sx={{
                  letterSpacing: -0.8,
                  textDecoration: isBlocked ? "line-through" : "none",
                  color: isBlocked ? "text.disabled" : "inherit",
                }}
              >
                {data?.name}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} mt={0.5}>
              <Chip
                label={configs.label}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  bgcolor: alpha(configs.mainColor, 0.1),
                  color: configs.mainColor,
                }}
              />
              {isBlocked && (
                <Chip
                  label="BANNED"
                  size="small"
                  color="error"
                  sx={{ height: 22, fontSize: "0.6rem", fontWeight: 900 }}
                />
              )}
            </Stack>
          </Box>
        </Stack>

        {/* Info Content */}
        <Stack spacing={2} sx={{ opacity: isBlocked ? 0.5 : 1 }}>
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
              bgcolor: isBlocked
                ? alpha("#ef4444", 0.05)
                : isDark
                  ? alpha(configs.mainColor, 0.05)
                  : alpha(configs.mainColor, 0.04),
              border: isBlocked ? "1px solid" : "1px dashed",
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
              >
                {configs.specialInfo.label}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              fontWeight={900}
              sx={{ color: configs.mainColor }}
            >
              {isBlocked ? "DISABLED" : configs.specialInfo.value}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* Footer & Popups */}
      <FooterCardBase
        isDark={isDark}
        data={data}
        id={id}
        theme={theme}
        configs={configs}
        setOpenEditSalaryPopup={setOpenEditSalaryPopup}
        setOpenDeleteChefPopup={setOpenDeleteChefPopup}
        setSnackbarAlert={setOpenSnackbar}
      />
      <EditSalaryPopup
        id={data?.id}
        open={openEditSalaryPopup}
        setOpenEditSalaryPopup={setOpenEditSalaryPopup}
        mainColor={configs.mainColor}
        setSnackbarAlert={setOpenSnackbar}
      />
      <DeleteChefPopup
        data={data}
        open={openDeleteChefPopup}
        setOpenDeleteChefPopup={setOpenDeleteChefPopup}
        setSnackbarAlert={setOpenSnackbar}
      />{" "}
    </Card>
  );
}
