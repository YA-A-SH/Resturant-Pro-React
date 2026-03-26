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
  Element4,
  SecurityUser,
  BagHappy,
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
      ? [
          {
            label: t("Admin"),
            key: "admin-dashboard",
            path: "/admin",
            icon: Element4,
          },
          {
            label: t("M-Users"),
            key: "manage-users",
            path: "/admin/manage-users",
            icon: SecurityUser,
          },
          {
            label: t("M-Deash's"),
            key: "manage-deash's",
            path: "#",
            icon: Reserve,
            items: [
              {
                label: t("M-Meals"),
                key: "manage-meals",
                path: "/admin/manageMeals",
                icon: BagHappy,
              },
              {
                label: t("M-Drinks"),
                key: "manage-drinks",
                path: "/admin/manageDrinks",
                icon: Coffee,
              },
              {
                label: t("M-Sweets"),
                key: "manage-sweets",
                path: "/admin/manageSweets",
                icon: Cake,
              },
            ],
          },

          {
            key: "settingAdmin",
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
              // {
              //   label: t("Language"),
              //   path: "#",
              //   icon: i18n.language === "ar" ? Translate : Global,
              //   from: "lang",
              //   key: "lang",
              // },

              {
                label: t("Log out"),
                path: "/logout",
                icon: LogoutCurve,
                key: "logoutAdmin",
              },
            ],
          },
        ]
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
              // {
              //   label: t("Language"),
              //   path: "#",
              //   icon: i18n.language === "ar" ? Translate : Global,
              //   from: "lang",
              //   key: "lang",
              // },
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
  const isXXS = useMediaQuery(theme.breakpoints.between("xxs", "ss"));
  const isSS = useMediaQuery(theme.breakpoints.between("ss", "sm"));
  const isSM = useMediaQuery(theme.breakpoints.between("sm", "ms"));
  const isMS = useMediaQuery(theme.breakpoints.between("ms", "md"));
  const isMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLG = useMediaQuery(theme.breakpoints.between("lg", "xl"));

  const getResponsiveSize = (isActive) => {
    const sizes = isAdmin
      ? isActive
        ? { xxs: "24", ss: "26", sm: "27", ms: "28", md: "25", lg: "28" }
        : { xxs: "20", ss: "23", sm: "24", ms: "26", md: "23", lg: "26" }
      : isActive
        ? { xxs: "24", ss: "26", sm: "27", ms: "28", md: "25", lg: "28" }
        : { xxs: "21", ss: "23", sm: "24", ms: "26", md: "23", lg: "26" };

    if (isXXS) return sizes.xxs;
    if (isSS) return sizes.ss;
    if (isSM) return sizes.sm;
    if (isMS) return sizes.ms;
    if (isMD) return sizes.md;
    if (isLG) return sizes.lg;

    return "18";
  };

  function handleBtnClick(key) {
    if (
      key === "dish" ||
      key === "setting" ||
      key === "manage-deash's" ||
      key === "settingAdmin"
    ) {
      setShowItems(true);
      setShowType(key);
    } else {
      setShowItems(false);
    }
    setSelectedBtn(key);
    if (
      key !== "dish" &&
      key !== "setting" &&
      key !== "manage-deash's" &&
      key !== "settingAdmin"
    ) {
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

  useEffect(() => {
    const dishManagePaths = [
      "/admin/manageMeals",
      "/admin/manageDrinks",
      "/admin/manageSweets",
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (dishManagePaths.includes(currentPath)) setSelectedBtn("manage-deash's");
    else if (currentPath === "/admin/manage-users")
      setSelectedBtn("manage-users");
    else if (currentPath === "#" || currentPath === "/admin")
      setSelectedBtn("admin-dashboard");
  }, [currentPath]);

  const currentLanguage = i18n.language;
  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        sx={{
          position: "absolute",
          top: { xxs: "65px", md: "0" },
          right: currentLanguage === "ar" ? "" : { md: 0 },
          left: currentLanguage === "ar" ? { md: 0 } : "",

          transform: { xxs: "translateX(-50%)", md: "" },
          width: { xxs: "100%", md: "430px", lg: "600px" },
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xxs: "99%", md: "100%" },
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
                    minWidth: isAdmin
                      ? { xxs: "35px", md: "70px", lg: "100px" }
                      : { xxs: "65px", md: "70px", lg: "110px" },
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
                      ? isAdmin
                        ? "admin.main"
                        : "#d7a500"
                      : isDark
                        ? "#b0b0b0"
                        : "#55595d",
                    px: { xxs: 2, md: 1 },
                    filter: isActive
                      ? "drop-shadow(0px 0px 4px rgba(215, 165, 0, 0.4))"
                      : "none",
                    gap: { md: 1 },
                    boxShadow: isActive
                      ? isAdmin
                        ? isDark
                          ? "0px 2px 8px rgba(81, 4, 223, 0.51)"
                          : "0px 2px 8px rgba(17, 0, 254, 0.67)"
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
                        opacity: ele.key === "home" ? 0 : 1,
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
                      mt: { md: 0.3 },
                      color: "inherit",
                      fontWeight: "bold",
                      fontSize: isAdmin
                        ? isActive
                          ? { xxs: "0.7rem", md: "0.8rem", lg: "1rem" }
                          : { xxs: "0.65rem", md: "0.75rem", lg: "0.85rem" }
                        : isActive
                          ? { md: "1rem", xxs: "0.7rem" }
                          : { md: "0.85rem", xxs: "0.6rem" },
                      display: isAdmin
                        ? { xxs: "none", ss: "initial" }
                        : "initial",
                      whiteSpace: "nowrap",
                      // overflow: "hidden",
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
