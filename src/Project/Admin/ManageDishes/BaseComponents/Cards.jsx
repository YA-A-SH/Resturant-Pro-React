import { TrendingDownRounded, TrendingUpRounded } from "@mui/icons-material";
import { alpha, Box, Card, Stack, Typography } from "@mui/material";

export default function KpiCard({
  title,
  value,
  icon,
  trend,
  isUp,
  color,
  subValue,
}) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        minHeight: 180,
        display: "flex",
        minWidth: 150,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: "12px",
            bgcolor: alpha(color, 0.1),
            color: color,
          }}
        >
          {icon}
        </Box>
        {trend && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isUp ? (
              <TrendingUpRounded sx={{ fontSize: 16, color: "#10B981" }} />
            ) : (
              <TrendingDownRounded sx={{ fontSize: 16, color: "#EF4444" }} />
            )}
            <Typography
              variant="caption"
              fontWeight={900}
              color={isUp ? "#10B981" : "#EF4444"}
            >
              {trend}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Typography variant="h5" fontWeight={900}>
        {value}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={700}
        sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
      >
        {title}
      </Typography>
      {subValue && (
        <Typography variant="body2" fontWeight={800} color={color} mt={0.5}>
          {subValue}
        </Typography>
      )}
    </Card>
  );
}
