import {
  HistoryEduRounded,
  WorkspacePremiumRounded,
  GppMaybeRounded,
  PersonOffRounded, // أيقونة للحساب المحظور
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function BaseDetails({ configs, type, isVerified, isBlocked }) {
  // دالة لتحديد محتوى كرت الثقة بناءً على الأولوية (الحظر أولاً)
  const getTrustStatus = () => {
    if (isBlocked) {
      return {
        title: "Account Restricted",
        subtitle: "This user is currently Blocked",
        color: "#EF4444", // Red
        icon: <PersonOffRounded sx={{ fontSize: 50, color: "#EF4444" }} />,
        bg: `linear-gradient(to right bottom, ${alpha("#EF4444", 0.1)}, transparent)`,
      };
    }
    if (isVerified) {
      return {
        title: "Trust Level",
        subtitle: "Identity Verified",
        color: "#10B981", // Green
        icon: (
          <WorkspacePremiumRounded sx={{ fontSize: 50, color: "#10B981" }} />
        ),
        bg: `linear-gradient(to right bottom, ${alpha("#10B981", 0.1)}, transparent)`,
      };
    }
    return {
      title: "Trust Level",
      subtitle: "Verification Pending",
      color: "#F59E0B", // Orange
      icon: <GppMaybeRounded sx={{ fontSize: 50, color: "#F59E0B" }} />,
      bg: `linear-gradient(to right bottom, ${alpha("#F59E0B", 0.1)}, transparent)`,
    };
  };

  const status = getTrustStatus();

  return (
    <>
      <Grid item xs={12} md={5}>
        <Stack spacing={4}>
          {/* Info Card */}
          <Card
            sx={{
              p: 4,
              borderRadius: "30px",
              border: "1px solid",
              borderColor: "divider",
              opacity: isBlocked ? 0.7 : 1, // جعل الكرت باهت قليلاً إذا كان محظوراً
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              mb={3}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <HistoryEduRounded
                sx={{ color: isBlocked ? "text.disabled" : configs.mainColor }}
              />
              Personal Biography
            </Typography>
            <Stack spacing={2.5}>
              {configs.details.map((detail, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: isBlocked ? "text.disabled" : configs.mainColor,
                    }}
                  />
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color={isBlocked ? "text.secondary" : "text.primary"}
                  >
                    {detail}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary">
              Registered on:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Card>

          {/* Status/Achievement Card */}
          <Card
            sx={{
              p: 4,
              borderRadius: "30px",
              background: status.bg,
              border: "1px solid",
              borderColor: alpha(status.color, 0.3),
              boxShadow: isBlocked
                ? `0 10px 20px ${alpha(status.color, 0.1)}`
                : "none",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" fontWeight={900}>
                  {status.title}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: status.color }}
                >
                  {status.subtitle}
                </Typography>
              </Box>
              {status.icon}
            </Stack>
          </Card>
        </Stack>

        {/* INFO Grid - الأرقام بالأسفل */}
        <Grid
          container
          spacing={2}
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            filter: isBlocked ? "grayscale(1)" : "none", // جعل الأرقام رمادية إذا كان محظوراً
            opacity: isBlocked ? 0.6 : 1,
          }}
        >
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: alpha(configs.mainColor, 0.05),
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={900}
                color={configs.mainColor}
              >
                {type === "chef" ? "8.5" : type === "user" ? "12k" : "99%"}
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                {type === "chef"
                  ? "Avg Rating"
                  : type === "user"
                    ? "Points"
                    : "System Uptime"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: alpha(configs.mainColor, 0.05),
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={900}
                color={configs.mainColor}
              >
                {isBlocked
                  ? "Suspended"
                  : type === "chef"
                    ? "24"
                    : type === "user"
                      ? "2"
                      : "Active"}
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                Status
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
