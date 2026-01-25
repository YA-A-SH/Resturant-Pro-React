import { Box, Grid, useTheme } from "@mui/material";

import ChartCard from "../../Main/Components/ChartCard";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Restaurant, Sell } from "@mui/icons-material";

export default function Charts({ t, time, firstChartData, secondChartData }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: isDark ? "#1e1e26" : "#fff",
      borderRadius: "16px",
      border: "none",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      padding: "10px",
    },
    itemStyle: { fontWeight: 700 },
  };
  return (
    <>
      <Grid
        container
        spacing={4}
        mb={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Sell's Chart */}

        <Grid item xs={12} lg={8}>
          <ChartCard
            title={
              time === "today"
                ? t("Today Sells")
                : time === "week"
                  ? t("This Week Sells")
                  : t("This Month Sells")
            }
            icon={<Sell />}
          >
            <Box sx={{ width: "100%", height: 300, mt: 3, pr: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={firstChartData}>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <Tooltip {...tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="sells"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorAdmin)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
        </Grid>

        {/* Top Dishes Chart */}

        <Grid item xs={12}>
          <ChartCard
            title={
              time === "today"
                ? t("Today Top Dishes")
                : time === "week"
                  ? t("This Week Top Dishes")
                  : t("This Month Top Dishes")
            }
            icon={<Restaurant />}
          >
            <Box sx={{ width: "100%", height: 300, mt: 3, pr: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={secondChartData}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{
                      fill: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                    }}
                    {...tooltipStyle}
                  />
                  <Bar dataKey="Dish" radius={[8, 8, 8, 8]} barSize={35}>
                    {secondChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index % 2 === 0 ? theme.palette.admin.main : "#2DD4BF"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
}
