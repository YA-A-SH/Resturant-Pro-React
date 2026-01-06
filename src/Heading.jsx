import { Close, List } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { ShowContext } from "./Project/Context/MainContext";
import ContNav from "./Project/Navbar/ContNav";
import { useNavigate } from "react-router-dom";

export default function Head({ setMode, mode }) {
  const { show, setShow } = useContext(ShowContext);
  const navigate = useNavigate();
  return (
    <>
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
          variant="h3"
          fontWeight={900}
          color="primary"
          sx={{ cursor: "pointer" }} 
          onClick={() => navigate("/")}
        >
          ZEUS Restaurant
        </Typography>

        <IconButton onClick={() => setShow(!show)} color="primary">
          {show ? <Close /> : <List />}
        </IconButton>
      </Box>

      <ContNav showIt={show} setMode={setMode} />
    </>
  );
}
