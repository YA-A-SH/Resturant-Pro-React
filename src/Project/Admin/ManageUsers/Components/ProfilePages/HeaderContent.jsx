import {
  BlockRounded,
  GppGoodRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

export default function HeaderContent({
  data,
  isDark,
  isUserVerified,
  type,
  renderActions,
  configs,
}) {
  return (
    <>
      <Box sx={{ p: { xxs: 3, md: 5 }, mt: -10, position: "relative" }}>
        <Stack
          direction={{ xxs: "column", lg: "row" }}
          spacing={4}
          alignItems={{ xxs: "center", lg: "flex-end" }}
          justifyContent="space-between"
        >
          <Stack
            direction={{ xxs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            {/* Avatar  */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={data?.img || data?.image}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: "40px",
                  border: `6px solid ${isDark ? "#16161a" : "#fff"}`,
                  filter: data?.isBlocked ? "grayscale(100%)" : "none",
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

            <Box sx={{ textAlign: { xxs: "center", md: "left" } }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={{ xxs: "center", md: "flex-start" }}
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
                justifyContent={{ xxs: "center", md: "flex-start" }}
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
            direction={{ xxs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            {renderActions()}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
