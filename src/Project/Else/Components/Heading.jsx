// Hooks

import { useContext, useState } from "react";

//Component

import ContNav from "../../User/Navbar/ContNav";

// Lib

import { useNavigate } from "react-router-dom";
import { Close, List } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IsAdminContext } from "../../User/Context/MainContext";

export default function Head({ setMode, mode }) {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const goUser = useSelector((state) => state.google.user);
  const maUser = useSelector((state) => state.email.user);
  const { isAdmin } = useContext(IsAdminContext);
  const disabled = !!goUser || !!maUser || isAdmin;

  return (
    <Box component="main">
      <Box
        sx={{
          height: 80,
          px: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: mode === "dark" ? "blur(12px)" : "blur(12px)",
          WebkitBackdropFilter: mode === "dark" ? "blur(12px)" : "blur(12px)",
          bgcolor:
            mode === "dark"
              ? "rgba(63, 63, 77, 0.6)"
              : "rgba(255, 255, 255, 0.6)",
          boxShadow:
            mode === "dark"
              ? "0 8px 25px rgba(255, 255, 255, 0.53)"
              : "0 4px 15px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
      >
        <Typography
          variant="h2"
          fontWeight={900}
          color="primary"
          sx={{
            cursor: "pointer",
            fontSize: {
              xxs: "2rem",
              xs: "3rem",
              sm: "3.4rem",
              md: "3.6rem",
              lg: "4.1rem",
            },
          }}
          onClick={!isAdmin ? () => navigate("/") : () => navigate("/admin")}
        >
          {isAdmin ? "ZEUS-Admin" : "ZEUS Restaurant"}
        </Typography>

        <IconButton
          onClick={() => setShowNav(!showNav)}
          color="primary"
          aria-label="Nav Icon"
          disabled={!disabled}
        >
          {showNav ? <Close /> : <List />}
        </IconButton>
      </Box>

      <ContNav showNav={showNav} setMode={setMode} setShowNav={setShowNav} />
    </Box>
  );
}
