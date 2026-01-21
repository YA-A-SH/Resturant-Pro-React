import {
  EditRounded,
  PersonOffRounded,
  VerifiedUserRounded,
  LocalFireDepartmentRounded,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function BaseHeader({
  configs,
  data,
  isDark,
  type,
  setSalaryState,
  setDeleteState,
}) {
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
            onClick={() => {
              setSalaryState(true);
            }}
          >
            Update Salary
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
            onClick={() => {
              setDeleteState(true);
            }}
          >
            Fire Chef
          </Button>
        </>
      );
    }

    if (type === "user") {
      return (
        <>
          <Button
            variant="contained"
            startIcon={<VerifiedUserRounded />}
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              bgcolor: "#10B981",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": { bgcolor: "#059669" },
            }}
          >
            Verify User
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonOffRounded />}
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              bgcolor: "#ef4444",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": { bgcolor: "#dc2626" },
            }}
          >
            Block User
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
      <Box sx={{ p: { xs: 3, md: 5 }, mt: -10, position: "relative" }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={4}
          alignItems={{ xs: "center", lg: "flex-end" }}
          justifyContent="space-between"
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              src={data?.img || data?.image}
              sx={{
                width: 160,
                height: 160,
                borderRadius: "40px",
                border: `6px solid ${isDark ? "#16161a" : "#fff"}`,
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              }}
            />
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{ letterSpacing: -1.5 }}
              >
                {data?.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>
                {data?.email || data?.mail}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>
                Salary : {data?.salary}$
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Chip
                  label={configs.tag}
                  sx={{
                    bgcolor: alpha(configs.mainColor, 0.15),
                    color: configs.mainColor,
                    fontWeight: 900,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                />
                <Chip
                  label={`ID: #${data?.id?.toString().slice(-4) || "7421"}`}
                  variant="outlined"
                  sx={{ fontWeight: 700, borderRadius: "10px" }}
                />
              </Stack>
            </Box>
          </Stack>

          {/* Action Buttons Container */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", lg: "auto" }, mt: { xs: 2, lg: 0 } }}
          >
            {renderActions()}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
