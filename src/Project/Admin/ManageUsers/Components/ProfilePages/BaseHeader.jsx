import {
  EditRounded,
  PersonOffRounded,
  VerifiedUserRounded,
  LocalFireDepartmentRounded,
  GppGoodRounded,
  BlockRounded,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toggleBlocked, toggleVerified } from "../../../../User/RTK/MainSlice";

export default function BaseHeader({
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
            onClick={() => setDeleteState(true)}
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
            {data?.isVerified ? "Verified Account" : "Verify User"}
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
            {data?.isBlocked ? "UnBlock User" : "Block User"}
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
            {/* Avatar with Floating Verified Badge */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={data?.img || data?.image}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: "40px",
                  border: `6px solid ${isDark ? "#16161a" : "#fff"}`,
                  filter: data?.isBlocked ? "grayscale(100%)" : "none", // جعل الصورة رمادية عند الحظر
                  opacity: data?.isBlocked ? 0.6 : 1,
                }}
              />

              {data?.isBlocked && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "40px",
                    bgcolor: "rgba(0,0,0,0.4)",
                  }}
                >
                  <BlockRounded
                    sx={{ color: "#fff", fontSize: 60, opacity: 0.8 }}
                  />
                </Box>
              )}

              {isUserVerified && (
                <Tooltip title="Identity Verified">
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: -10,
                      bgcolor: "#10B981",
                      color: "white",
                      p: 1,
                      borderRadius: "12px",
                      border: `4px solid ${isDark ? "#16161a" : "#fff"}`,
                      display: "flex",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    <VerifiedUserRounded fontSize="medium" />
                  </Box>
                </Tooltip>
              )}
            </Box>

            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{ letterSpacing: -1.5 }}
                >
                  {data?.name}
                </Typography>
                {isUserVerified && (
                  <VerifiedUserRounded
                    sx={{ color: "#10B981", fontSize: 35 }}
                  />
                )}
              </Stack>

              <Typography variant="h6" color="text.secondary" fontWeight={500}>
                {data?.email || data?.mail}
              </Typography>

              {type === "chef" && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Salary : {data?.salary}$
                </Typography>
              )}

              <Stack
                direction="row"
                spacing={1}
                mt={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Chip
                  label={configs.tag}
                  icon={
                    isUserVerified ? (
                      <GppGoodRounded style={{ color: "inherit" }} />
                    ) : (
                      configs.icon
                    )
                  }
                  sx={{
                    bgcolor: alpha(configs.mainColor, 0.15),
                    color: configs.mainColor,
                    fontWeight: 900,
                    px: 1,
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

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            {renderActions()}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
