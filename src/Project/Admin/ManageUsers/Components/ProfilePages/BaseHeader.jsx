import {
  EditRounded,
  PersonOffRounded,
  VerifiedUserRounded,
  LocalFireDepartmentRounded,
  GppGoodRounded,
  BlockRounded,
} from "@mui/icons-material";
import { alpha, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toggleBlocked, toggleVerified } from "../../../../User/RTK/MainSlice";
import HeaderContent from "./HeaderContent";
export default function BaseHeader({
  t,
  configs,
  data,
  isDark,
  type,
  setSalaryState,
  setDeleteState,
}) {
  const dispatch = useDispatch();
  const isUserVerified = type === "user" && data?.isVerified;

  const renderActions = () => {
    if (type === "chef") {
      return (
        <>
          <Button
            variant="contained"
            startIcon={<EditRounded />}
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              bgcolor: configs.mainColor,
              fontWeight: 800,
              textTransform: "none",
              transition: "0.5s",
              "&:hover": {
                bgcolor: configs.mainColor,
                transform: "translateY(-2px)",
              },
            }}
            onClick={() => setSalaryState(true)}
          >
            {t("Update Salary")}
          </Button>
          <Button
            variant="outlined"
            startIcon={<LocalFireDepartmentRounded />}
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              color: "#ff3d00",
              borderColor: alpha("#ff3d00", 0.5),
              fontWeight: 800,
              textTransform: "none",
              "&:hover": {
                borderColor: "#ff3d00",
                bgcolor: alpha("#ff3d00", 0.05),
              },
            }}
            onClick={() => setDeleteState(true)}
          >
            {t("Fire Chef")}
          </Button>
        </>
      );
    }

    if (type === "user") {
      return (
        <>
          <Button
            variant="contained"
            startIcon={
              data?.isVerified ? <GppGoodRounded /> : <VerifiedUserRounded />
            }
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              bgcolor: data?.isVerified ? "#059669" : "#10B981",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: data?.isVerified
                ? `0 8px 20px ${alpha("#059669", 0.3)}`
                : "none",
              "&:hover": { bgcolor: "#059669" },
            }}
            onClick={() => dispatch(toggleVerified(data.id))}
          >
            {data?.isVerified ? t("Verified Account") : t("Verify User")}
          </Button>
          <Button
            variant="contained"
            startIcon={
              data?.isBlocked ? <PersonOffRounded /> : <BlockRounded />
            }
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              bgcolor: "#ef4444",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": { bgcolor: "#dc2626" },
            }}
            onClick={() => dispatch(toggleBlocked(data.id))}
          >
            {" "}
            {data?.isBlocked ? t("UnBlock User") : t("Block User")}
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        borderRadius: "40px",
        overflow: "hidden",
        bgcolor: isDark ? "#16161a" : "#fff",
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        mb: 4,
      }}
    >
      {/* Cover Area */}
      <Box
        sx={{ height: 180, background: configs.gradient, position: "relative" }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "url('https://www.transparenttextures.com/patterns/cubes.png')",
            opacity: 0.2,
          }}
        />
      </Box>
      {/* Content Area */}
      <HeaderContent
        data={data}
        isDark={isDark}
        isUserVerified={isUserVerified}
        type={type}
        renderActions={renderActions}
        configs={configs}
      />
    </Box>
  );
}
