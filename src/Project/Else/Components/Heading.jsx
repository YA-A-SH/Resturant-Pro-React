import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import {
  IsAdminContext,
  ModeContext,
} from "@else/Components/Context/MainContext";
import { useTranslation } from "react-i18next";
import PreNav from "@user/Navbar/PresenterNavbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@user/RTK/LogSlice";

const Head = React.memo(() => {
  const { mode } = useContext(ModeContext);
  const { isAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = mode === "dark";
  const headerBg = isAdmin
    ? isDark
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(248, 250, 252, 0.8)"
    : isDark
      ? "rgba(5, 5, 5, 0.85)"
      : "rgba(248, 249, 250, 0.85)";

  const user = useSelector(selectCurrentUser);

  const disabled = !!user;
  return (
    <>
      <Box
        component="header"
        sx={{
          height: 80,
          px: { xxs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: { xxs: "center", md: "space-between" },
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backdropFilter: "blur(15px)",
          bgcolor: headerBg,
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          transition: "background 0.3s ease",
          boxShadow: isDark
            ? "0px 2px 10px 0px #ffffff50"
            : "0px 2px 10px 0px #00000050",
        }}
      >
        <Box
          onClick={() => navigate(isAdmin ? "/admin" : "/")}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              cursor: "pointer",
              userSelect: "none",
              letterSpacing: "-0.5px",
              background: isAdmin
                ? theme.palette.admin.gradient
                : `linear-gradient(135deg, ${theme.palette.primary.custom} 0%, ${theme.palette.primary.light} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: {
                xxs: "2.09rem",
                ss: "3rem",
                sm: "3.2rem",
                md: "2.5rem",
              },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            {isAdmin ? t("ZEUS ADMIN") : t("ZEUS RESTAURANT")}
          </Typography>
        </Box>
        {disabled ? (
          <PreNav />
        ) : (
          <Box
            component="img"
            src="/logo_2.webp"
            alt="Logo"
            sx={{
              position: { xxs: "absolute", md: "initial" },
              top: { xxs: 50, md: "" },
              height: 80,
              filter: isDark
                ? "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.1))"
                : "none",
              transition: "all 0.4s ease",
              "&:hover": { transform: "rotate(5deg) scale(1.1)" },
            }}
          />
        )}
      </Box>
    </>
  );
});

export default Head;
