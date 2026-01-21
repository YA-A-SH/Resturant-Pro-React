import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChefsContext } from "../../../../User/Context/MainContext";
import ProfileView from "./BaseProfile";
import { Box, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";

const EliteLoader = ({ color = "#10B981" }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: (theme) =>
        theme.palette.mode === "dark" ? "#0a0a0c" : "#f8fafc",
    }}
  >
    <Box sx={{ position: "relative", width: 120, height: 120 }}>
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["30%", "50%", "30%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            inset: 0,
            border: `2px solid ${alpha(color, 0.2 - i * 0.05)}`,
            boxShadow: i === 0 ? `0 0 20px ${alpha(color, 0.2)}` : "none",
          }}
        />
      ))}

      <Box
        component={motion.div}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          fontSize: "2rem",
          fontWeight: 900,
        }}
      >
        ZEUS
      </Box>
    </Box>

    <Typography
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      sx={{
        mt: 4,
        fontWeight: 800,
        letterSpacing: 2,
        color: "text.secondary",
        fontSize: "0.75rem",
        textTransform: "uppercase",
      }}
    >
      Preparing Culinary Profile...
    </Typography>
  </Box>
);

export default function ChefProfile() {
  const location = useLocation();
  const chefId = location.state?.userData?.id;
  const { chefs } = useContext(ChefsContext);
  const navigate = useNavigate();

  const chef = chefs.find((c) => String(c.id) === String(chefId));

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!chef) navigate("/admin/manage-users", { replace: true });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [chef, navigate]);

  if (!chef) {
    return <EliteLoader color="#10B981" />;
  }

  return (
    <ProfileView
      type="chef"
      data={chef}
      state1={openEdit}
      state2={openDelete}
      setState1={setOpenEdit}
      setState2={setOpenDelete}
    />
  );
}
