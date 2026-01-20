import { Box, Grid, useTheme } from "@mui/material";
import ChartCard from "./ChartCard";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Group, Restaurant, TrendingUp } from "@mui/icons-material";

export default function Charts() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const CHART_COLORS = {
    primary: theme.palette.admin.main,
    secondary: "#2DD4BF",
    warning: "#F59E0B",
    error: "#EF4444",
  };

  const percentageOfDishSales = [
    { name: "Meals", orders: 63 },
    { name: "Drinks", orders: 24 },
    { name: "Sweets", orders: 13 },
  ];

  const usersData = [
    { year: "2015", users: 400 },
    { year: "2020", users: 11650 },
    { year: "2022", users: 22000 },
    { year: "2024", users: 38016 },
    { year: "2026", users: 50680 },
  ];
  const topTenDishes = [
    { name: "Big Mac", Dish: 13000 },
    { name: "Koshari", Dish: 7000 },
    { name: "Cacik", Dish: 3300 },
    { name: "Migas", Dish: 7000 },
    { name: "Afterglow", Dish: 10533 },
    { name: "Apple Karate", Dish: 5000 },
    { name: "Hot Cocoa", Dish: 3332 },
    { name: "Bananas", Dish: 8000 },
    { name: "Thai Coffee", Dish: 6329 },
    { name: "Pancakes", Dish: 9144 },
  ];

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
    <Grid
      container
      spacing={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {/* 1. User Growth (Area Chart) */}
      <Grid item xs={12} lg={8}>
        <ChartCard title="User Ecosystem Evolution" icon={<Group />}>
          <Box sx={{ width: "100%", height: 300, mt: 3, pr: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usersData}>
                <defs>
                  <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                />
                <Tooltip {...tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAdmin)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>
      </Grid>

      {/* 2. Revenue Stream (Pie Chart) */}
      <Grid item xs={12} lg={4}>
        <ChartCard title="Revenue Distribution" icon={<TrendingUp />}>
          <Box sx={{ width: "100%", height: 300, mt: 3, pr: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={percentageOfDishSales}
                  innerRadius="65%"
                  outerRadius="85%"
                  paddingAngle={10}
                  dataKey="orders"
                >
                  {[
                    CHART_COLORS.primary,
                    CHART_COLORS.secondary,
                    CHART_COLORS.warning,
                  ].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>
      </Grid>

      {/* 3. Top Dishes (Bar Chart) */}
      <Grid item xs={12}>
        <ChartCard title="Elite Culinary Performance" icon={<Restaurant />}>
          <Box sx={{ width: "100%", height: 300, mt: 3, pr: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTenDishes}>
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
                  {topTenDishes.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index % 2 === 0
                          ? CHART_COLORS.primary
                          : CHART_COLORS.secondary
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
  );
}
