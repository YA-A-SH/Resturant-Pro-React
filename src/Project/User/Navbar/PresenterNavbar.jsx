import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  IsAdminContext,
  ModeContext,
} from "@else/Components/Context/MainContext";
import { Link, useLocation } from "react-router-dom";
import {
  Home2,
  Setting2,
  Coffee,
  InfoCircle,
  Reserve,
  Profile,
  Cake,
  LogoutCurve,
  Crown1,
  Translate,
  Sun1,
  Global,
  Moon,
} from "iconsax-react";
import BaseModal from "./Components/BaseModal";

const PreNav = React.memo(() => {
  const { mode } = useContext(ModeContext);
  const { t, i18n } = useTranslation();
  const { isAdmin } = useContext(IsAdminContext);
  const [showItems, setShowItems] = useState(false);
  const [showType, setShowType] = useState("");
  const [selectedBtn, setSelectedBtn] = useState(
    () => localStorage.getItem("btnSelectedNav") || "home",
  );

  const isDark = mode === "dark";
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();

  const menuItems = useMemo(() => {
    return isAdmin
      ? []
      : [
          { label: t("Home"), key: "home", path: "/", icon: Home2 },
          {
            label: t("Profile"),
            key: "profile",
            path: "/profile",
            icon: Profile,
          },
          {
            label: t("Dishes"),
            key: "dish",
            icon: Crown1,
            path: "#",
            items: [
              { label: t("Meals"), path: "/meals", icon: Reserve, key: "meal" },
              {
                label: t("Drinks"),
                path: "/drinks",
                icon: Coffee,
                key: "drink",
              },
              { label: t("Sweets"), path: "/sweet", icon: Cake, key: "sweet" },
            ],
          },
          {
            key: "setting",
            label: t("Settings"),
            icon: Setting2,
            items: [
              {
                label: t("Mode"),
                path: "#",
                icon: mode === "light" ? Sun1 : Moon,
                from: "mode",
                key: "mode",
              },
              {
                label: t("Language"),
                path: "#",
                icon: i18n.language === "ar" ? Translate : Global,
                from: "lang",
                key: "lang",
              },
              {
                label: t("About us"),
                path: "/aboutUs",
                icon: InfoCircle,
                key: "about",
              },
              {
                label: t("Log out"),
                path: "/logout",
                icon: LogoutCurve,
                key: "logout",
              },
            ],
          },
        ];
  }, [i18n.language, isAdmin, mode, t]);

  // Responsive Breakpoints
  const isXXS = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
  const isXS = useMediaQuery(theme.breakpoints.between("xs", "ss"));
  const isSS = useMediaQuery(theme.breakpoints.between("ss", "sm"));
  const isSM = useMediaQuery(theme.breakpoints.between("sm", "ms"));
  const isMS = useMediaQuery(theme.breakpoints.between("ms", "md"));
  const isMD = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const getResponsiveSize = (isActive) => {
    const sizes = isActive
      ? { xxs: "24", xs: "25", ss: "26", sm: "27", ms: "28", md: "25" }
      : { xxs: "21", xs: "22", ss: "23", sm: "24", ms: "26", md: "23" };

    if (isXXS) return sizes.xxs;
    if (isXS) return sizes.xs;
    if (isSS) return sizes.ss;
    if (isSM) return sizes.sm;
    if (isMS) return sizes.ms;
    if (isMD) return sizes.md;
    return "18";
  };

  function handleBtnClick(key) {
    if (key === "dish" || key === "setting") {
      setShowItems(true);
      setShowType(key);
    } else {
      setShowItems(false);
    }
    setSelectedBtn(key);
    if (key !== "dish" && key !== "setting") {
      localStorage.setItem("btnSelectedNav", key);
    }
  }

  useEffect(() => {
    const dishPaths = ["/meals", "/drinks", "/sweet"];
    const settingPaths = ["/aboutUs", "/logout"];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (dishPaths.includes(currentPath)) setSelectedBtn("dish");
    else if (settingPaths.includes(currentPath)) setSelectedBtn("setting");
    else if (currentPath === "#" || currentPath === "/") setSelectedBtn("home");
  }, [currentPath]);

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        sx={{
          position: "fixed",
          top: { xxs: "65px", md: "0" },
          right: { md: 0 },
          transform: { xxs: "translateX(-50%)", md: "" },
          width: { xxs: "100%", md: "500px" },
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xxs: "99%", xs: "95%", md: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xxs: "80px", md: "" },
            borderRadius: { xxs: "50px", md: "0px" },
            boxShadow: isDark
              ? "0 10px 30px rgba(0,0,0,0.5)"
              : { xxs: "0 10px 30px rgba(0,0,0,0.08)", md: "none" },
            bgcolor: isDark
              ? { xxs: "#222222", md: "transparent" }
              : { xxs: "#ffffff", md: "transparent" },
          }}
        >
          <Box
            sx={{
              width: { xxs: "94%", md: "100%" },
              p: 1,
              height: { xxs: "60px", md: 75 },
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              border: isDark
                ? { xxs: "1px solid #333", md: "none" }
                : { xxs: "1px solid #d9d9d9", md: "none" },
              borderRadius: { xxs: "50px", md: "0" },
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : { xxs: "0 8px 32px 0 rgba(0, 0, 0, 0.05)", md: "none" },
              bgcolor: isDark ? { xxs: "#444444", md: "transparent" } : {},
            }}
          >
            {menuItems.map((ele) => {
              const isActive = selectedBtn === ele.key;

              return (
                <Button
                  key={ele.key}
                  component={ele.path ? Link : "button"}
                  to={ele.path || "#"}
                  onClick={() => handleBtnClick(ele.key)}
                  sx={{
                    minWidth: { xxs: "65px", md: "100px" },
                    height: "50px",
                    display: "flex",
                    flexDirection: { xxs: "column", md: "row" },
                    borderRadius: "100px",
                    textTransform: "none",
                    bgcolor: isActive
                      ? isDark
                        ? "#000000"
                        : "#222222"
                      : "transparent",
                    color: isActive
                      ? "#d7a500"
                      : isDark
                        ? "#b0b0b0"
                        : "#55595d",
                    px: { xxs: 2, md: 1 },
                    filter: isActive
                      ? "drop-shadow(0px 0px 4px rgba(215, 165, 0, 0.4))"
                      : "none",
                    gap: { md: 1 },
                    boxShadow: isActive
                      ? isDark
                        ? "0px 2px 8px rgba(215, 165, 0, 0.3)"
                        : "0px 2px 5px rgba(0,0,0,0.2)"
                      : "none",
                    alignItems: { md: "center" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: isActive
                        ? isDark
                          ? "#000"
                          : "#222"
                        : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                    },
                    "&:before": {
                      md: {
                        content: '""',
                        position: "absolute",
                        bottom: 15,
                        left: -5,
                        height: "20px",
                        width: "1px",
                        background: isDark ? "#444" : "#ccc",
                        opacity: ele.key === "home" ? 0 : 1, // إخفاء الفاصل قبل أول عنصر
                      },
                    },
                  }}
                >
                  <IconButton sx={{ color: "inherit", p: 0 }}>
                    {" "}
                    {React.createElement(ele.icon, {
                      size: getResponsiveSize(isActive),
                      variant: isActive ? "Bold" : "Linear",
                    })}
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.3,
                      color: "inherit",
                      fontWeight: isActive ? "bold" : "medium",
                      fontSize: { md: "1rem", xxs: "0.7rem" },
                    }}
                  >
                    {ele.label}
                  </Typography>
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>
      <BaseModal
        type={showType}
        data={menuItems}
        show={showItems}
        setShow={setShowItems}
      />
    </AnimatePresence>
  );
});

export default PreNav;
