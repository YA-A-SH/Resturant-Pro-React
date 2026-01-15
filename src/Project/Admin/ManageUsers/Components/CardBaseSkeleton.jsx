import { Card, Box, Skeleton, Stack, alpha } from "@mui/material";

export default function CardBaseSkeleton({ isDark }) {
  return (
    <Card
      sx={{
        p: 0,
        width: "100%",
        minWidth: "250px",
        borderRadius: "24px",
        overflow: "hidden",
        bgcolor: isDark ? alpha("#121212", 0.6) : "#fff",
        border: `1px solid ${
          isDark ? alpha("#fff", 0.1) : alpha("#000", 0.05)
        }`,
      }}
    >
      {/* Top Accent */}
      <Skeleton variant="rectangular" height={5} width="100%" />

      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
          <Skeleton
            variant="rounded"
            width={65}
            height={65}
            sx={{ borderRadius: "16px" }}
          />

          <Box sx={{ flex: 1 }}>
            <Skeleton width="70%" height={22} />
            <Skeleton
              width="40%"
              height={18}
              sx={{ mt: 1, borderRadius: 10 }}
            />
          </Box>
        </Stack>

        {/* Info Rows */}
        <Stack spacing={1.5}>
          {[1, 2].map((i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="center">
              <Skeleton variant="circular" width={20} height={20} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="30%" height={12} />
                <Skeleton width="80%" height={16} />
              </Box>
            </Stack>
          ))}

          {/* Highlight Box */}
          <Box
            sx={{
              mt: 1,
              p: 1.5,
              borderRadius: "16px",
              border: `1px solid ${
                isDark ? alpha("#fff", 0.05) : alpha("#000", 0.05)
              }`,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Skeleton width="40%" height={16} />
              <Skeleton width="20%" height={18} />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Footer */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 2,
          borderTop: `1px solid ${
            isDark ? alpha("#fff", 0.05) : alpha("#000", 0.05)
          }`,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>

        <Skeleton
          variant="rounded"
          width={80}
          height={32}
          sx={{ borderRadius: "12px" }}
        />
      </Stack>
    </Card>
  );
}
