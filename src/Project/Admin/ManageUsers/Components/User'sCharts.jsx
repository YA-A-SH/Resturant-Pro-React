import {
  Grid,
  Paper,
  Box,
  Typography,
  alpha,
  useTheme,
  Stack,
} from "@mui/material";
import ChartCard from "../../Main/Components/ChartCard";
import { BlockRounded, TrendingUpRounded } from "@mui/icons-material";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { useTranslation } from "react-i18next";
import React from "react";

const UsersCharts = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDark = theme.palette.mode === "dark";

  const verifyUsers = [
    { year: "2015", users: 400, verifyUsers: 58 },
    { year: "2020", users: 11650, verifyUsers: 7403 },
    { year: "2022", users: 22000, verifyUsers: 16034 },
    { year: "2024", users: 38016, verifyUsers: 26052 },
    { year: "2026", users: 50680, verifyUsers: 44923 },
  ];

  const banUsers = [
    { year: "2015", ban: 13 },
    { year: "2020", ban: 190 },
    { year: "2022", ban: 163 },
    { year: "2024", ban: 220 },
    { year: "2026", ban: 45 },
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12} lg={8}>
          <ChartCard
            title={t("User Growth Analysis")}
            subtitle={t("Real-time verification metrics")}
            icon={<TrendingUpRounded sx={{ color: "admin.main" }} />}
          >
            <Box sx={{ width: "100%", height: 380, mt: 3, pr: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={verifyUsers}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme.palette.admin.main}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.admin.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorVerify"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={
                      isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                    }
                  />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: theme.palette.text.secondary,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{
                      stroke: theme.palette.admin.main,
                      strokeWidth: 2,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: "25px", fontWeight: 700 }}
                  />

                  <Area
                    type="monotone"
                    name={t("Total Community")}
                    dataKey="users"
                    stroke={theme.palette.admin.main}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                  <Area
                    type="monotone"
                    name={t("Verified Accounts")}
                    dataKey="verifyUsers"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVerify)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
        </Grid>

        <Grid item xxs={12} lg={8}>
          <ChartCard
            title={t("Security Center")}
            subtitle={t("Account restriction history")}
            icon={<BlockRounded sx={{ color: "#ef4444" }} />}
          >
            <Box sx={{ width: "100%", height: 380, mt: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={banUsers} margin="10px">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={
                      isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                    }
                  />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: theme.palette.text.secondary,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                  <Tooltip
                    cursor={{
                      fill: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                    }}
                  />
                  <Bar
                    dataKey="ban"
                    name="Banned"
                    radius={[10, 10, 10, 10]}
                    barSize={18}
                  >
                    {banUsers.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === banUsers.length - 1
                            ? "#ef4444"
                            : alpha("#ef4444", 0.4)
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
    </Box>
  );
});
export default UsersCharts;
