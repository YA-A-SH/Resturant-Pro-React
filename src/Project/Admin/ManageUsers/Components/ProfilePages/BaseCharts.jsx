import {
  Money,
  Restaurant,
  Star,
  AutoGraphRounded,
  HistoryToggleOffRounded,
} from "@mui/icons-material";
import { Box, Grid, useTheme, Typography, alpha, Stack } from "@mui/material";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import ChartCard from "../../../Main/Components/ChartCard";
import { motion, AnimatePresence } from "framer-motion";

export default function BaseCharts({ type, isDark, chartData }) {
  const theme = useTheme();

  const getThemeAssets = () => {
    switch (type) {
      case "manager":
        return {
          color: theme.palette.admin?.main || "#6366F1",
          icon: <Money />,
          title: "Manager Income Evolution",
          emptyMsg: "Financial records are still being processed.",
          subMsg:
            "Income data will appear once the next billing cycle completes.",
        };
      case "chef":
        return {
          color: "#10B981",
          icon: <Star />,
          title: "Chef Rating Performance",
          emptyMsg: "Fresh Talent - No Reviews Yet.",
          subMsg:
            "It would be unfair to judge this chef's art before their first signature dish!",
        };
      default:
        return {
          color: "#F59E0B",
          icon: <Restaurant />,
          title: "Total Orders History",
          emptyMsg: "No orders recorded in this period.",
          subMsg: "Wait for the rush hour to see the performance metrics live.",
        };
    }
  };

  const assets = getThemeAssets();
  const hasData = chartData && chartData.length > 0;

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: isDark ? "#1e1e26" : "#fff",
      borderRadius: "16px",
      border: "none",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      padding: "10px",
    },
    itemStyle: { fontWeight: 700, color: assets.color },
  };

  const dataKey =
    type === "manager" ? "income" : type === "chef" ? "rate" : "value";

  return (
    <Grid item xs={12} lg={8}>
      <ChartCard
        sentColor={assets.color}
        title={assets.title}
        icon={assets.icon}
      >
        <Box
          sx={{
            width: "100%",
            height: 300,
            mt: 3,
            pr: 2,
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            {hasData ? (
              // حالة وجود بيانات
              <Box
                component={motion.div}
                key="chart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{ width: "100%", height: "100%" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorDynamic"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={assets.color}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={assets.color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDark ? "#333" : "#eee"}
                    />
                    <XAxis dataKey="month" hide={true} />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip {...tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey={dataKey}
                      stroke={assets.color}
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorDynamic)"
                      animationDuration={1500}
                      activeDot={{ r: 6, strokeWidth: 0, fill: assets.color }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              // حالة عدم وجود بيانات (Empty State)
              <Box
                component={motion.div}
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "24px",
                  bgcolor: isDark
                    ? alpha(assets.color, 0.03)
                    : alpha(assets.color, 0.02),
                  border: `1px dashed ${alpha(assets.color, 0.2)}`,
                }}
              >
                <Stack
                  alignItems="center"
                  spacing={2}
                  sx={{ textAlign: "center", p: 3 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      bgcolor: alpha(assets.color, 0.1),
                      color: assets.color,
                      display: "flex",
                      animation: "pulse 2s infinite ease-in-out",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)", opacity: 0.8 },
                        "50%": { transform: "scale(1.1)", opacity: 1 },
                        "100%": { transform: "scale(1)", opacity: 0.8 },
                      },
                    }}
                  >
                    <HistoryToggleOffRounded sx={{ fontSize: 40 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={900}
                      sx={{ letterSpacing: -0.5 }}
                    >
                      {assets.emptyMsg}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        maxWidth: 300,
                        mx: "auto",
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {assets.subMsg}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </ChartCard>
    </Grid>
  );
}
