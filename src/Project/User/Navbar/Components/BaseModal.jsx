import { ModeContext } from "@else/Components/Context/MainContext";
import { ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Fab,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp2, ArrowUp3, DirectUp } from "iconsax-react";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const BaseModal = ({ show, setShow, type, data }) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const menuItems = data.find((item) => item.key === type)?.items || [];
  const theme = useTheme();

  const { mode, setMode } = useContext(ModeContext);

  function handleNestedNavBtnClick(ele) {
    if (ele.from) {
      switch (ele.from) {
        case "lang": {
          const nextLang = i18n.language === "ar" ? "en" : "ar";
          i18n.changeLanguage(nextLang);
          localStorage.setItem("lang", nextLang);
          break;
        }
        case "mode":
          setMode(mode === "light" ? "dark" : "light");
      }
    }
  }

  const isXXS = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
  const isXS = useMediaQuery(theme.breakpoints.between("xs", "ss"));
  const isSS = useMediaQuery(theme.breakpoints.between("ss", "sm"));
  const isSM = useMediaQuery(theme.breakpoints.between("sm", "ms"));
  const isMS = useMediaQuery(theme.breakpoints.between("ms", "md"));
  const isMD = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLG = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXL = useMediaQuery(theme.breakpoints.between("xl", "xxl"));

  const getResponsiveSize = (isActive) => {
    if (isActive) {
      if (isXXS) return "24";
      if (isXS) return "25";
      if (isSS) return "26";
      if (isSM) return "28";
      if (isMS) return "29";
      if (isMD) return "30";
      if (isLG) return "31";
      if (isXL) return "31";
    }

    if (isXXS) return "21";
    if (isXS) return "22";
    if (isSS) return "24";
    if (isSM) return "26";
    if (isMS) return "27";
    if (isMD) return "26";
    if (isLG) return "30";
    if (isXL) return "31";

    return "18";
  };
  return (
    <AnimatePresence>
      {show && (
        <Box
          onClick={() => setShow(false)}
          component={motion.div}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: -7, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          sx={{
            position: "fixed",
            top: { xxs: "140px", ss: "150px", md: 77 },
            right: { md: 0 },
            maxWidth: { md: 400 },
            transform: "translateX(-50%)",
            width: "60%",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Fab
            color="error"
            size="small"
            sx={{
              position: "fixed",
              bottom: -30,
              scale: { xxs: "0.7", ss: "0.8" },
              boxShadow: "0 0 20px rgba(255,152,0,0.6)",
            }}
            aria-label="Close Nav"
            onClick={() => setShow(false)}
          >
            <IconButton sx={{ color: "inherit", p: 0 }}>
              {React.createElement(ArrowUp2, {
                size: 29,
              })}
            </IconButton>
          </Fab>
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: { xxs: "99%", xs: "95%" },
              bgcolor: "primary.custom",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xxs: "50px", ss: "65px" },
              borderRadius: "30px",
              boxShadow: "0px 5px 8px #0000003c ",
            }}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: "98%",
                p: 1,
                height: { xxs: "45px", ss: "55px" },
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "40px",
                backdropFilter: "blur(15px) saturate(160%)",
                WebkitBackdropFilter: "blur(15px) saturate(160%)",
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, rgba(1, 0, 0, 0.7), rgba(255, 255, 255, 0.3))"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",

                border: "1px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              }}
            >
              {menuItems.map((ele, index) => {
                const isActive = location.pathname === ele.path;
                return (
                  <Button
                    key={index}
                    to={ele.path || "#"}
                    component={ele.path ? Link : "button"}
                    sx={{
                      color: isActive
                        ? mode === "dark"
                          ? "#e2b04a"
                          : "primary.main"
                        : mode === "dark"
                          ? "rgba(255,255,255,0.4)"
                          : "gray",
                      filter:
                        isActive && mode === "dark"
                          ? "drop-shadow(0 0 8px rgba(226, 176, 74, 0.8))"
                          : "none",
                      minWidth: "15px",
                      height: "30px",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "100px",
                      textTransform: "none",
                      px: 2,
                      transition: "0.6s",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: { xxs: -3, ss: -6 },
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "0px",
                        height: "4px",
                        backgroundColor: "gray",
                        borderRadius: "10px 10px 0px 0px",
                        transition: "0.4s",
                      },

                      "&:hover::after": !isActive
                        ? {
                            width: { xxs: "20px", ss: "30px" },
                          }
                        : {},
                      "&::before": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: { xxs: -3, ss: -6 },
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: { xxs: "25px", ss: "33px" },
                            height: "3px",
                            backgroundColor: theme.palette.primary.custom,
                            borderRadius: "10px 10px 0px 0px",
                          }
                        : {},
                    }}
                    onClick={() => handleNestedNavBtnClick(ele)}
                  >
                    <IconButton
                      sx={{
                        color: "inherit",
                        p: 0,
                        "&:hover": { bgcolor: "transparent" },
                      }}
                    >
                      {React.createElement(ele.icon, {
                        size: getResponsiveSize(isActive),
                      })}
                    </IconButton>
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default BaseModal;
