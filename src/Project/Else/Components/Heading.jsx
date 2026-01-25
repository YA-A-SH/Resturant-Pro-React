import { useContext, useState } from "react";
import ContNav from "../../User/Navbar/ContNav";
import { useNavigate } from "react-router-dom";
import { Close, List } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { IsAdminContext } from "../../User/Context/MainContext";
import { useTranslation } from "react-i18next";

export default function Head({ setMode, mode }) {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = mode === "dark";

  const goUser = useSelector((state) => state.google.user);
  const maUser = useSelector((state) => state.email.user);
  const { isAdmin } = useContext(IsAdminContext);
  const disabled = !!goUser || !!maUser || isAdmin;

  const headerBg = isAdmin
    ? isDark
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(248, 250, 252, 0.8)"
    : theme.palette.background.glass;

  return (
    <>
      <Box
        component="header"
        sx={{
          height: 80,
          px: { xxs: 2, xs: 2, md: 4 },
          display: "flex",

          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          bgcolor: headerBg,
          borderBottom: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
          boxShadow: isDark
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(148, 163, 184, 0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          onClick={() => navigate(isAdmin ? "/admin" : "/")}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            letterSpacing: "-0.5px",
            background: isAdmin
              ? theme.palette.admin.gradient
              : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: {
              xxs: "1.7rem",
              xs: "2rem",
              sm: "3.2rem",
              md: "3.5rem",
            },
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          {isAdmin ? t("ZEUS Admin") : t("ZEUS Restaurant")}
        </Typography>

        <IconButton
          onClick={() => setShowNav(!showNav)}
          disabled={!disabled}
          sx={{
            color: isAdmin ? "admin.main" : "primary.main",
            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
            borderRadius: "12px",
            p: 1.2,
            transition: "0.3s",
            "&:hover": {
              bgcolor: isAdmin
                ? "rgba(99, 102, 241, 0.1)"
                : "rgba(184, 134, 11, 0.1)",
              transform: "rotate(30deg)",
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
            scale: { xxs: 0.84, sm: 1 },
          }}
        >
          {showNav ? <Close /> : <List />}
        </IconButton>
      </Box>

      <ContNav showNav={showNav} setMode={setMode} setShowNav={setShowNav} />
    </>
  );
}
