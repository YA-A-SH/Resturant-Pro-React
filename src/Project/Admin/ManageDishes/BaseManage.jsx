import { Group } from "@mui/icons-material";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import ChartCard from "../Components/ChartCard";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Outlet } from "react-router-dom";

export default function BaseManage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const mealsData = [
    { year: "2015", users: 400 },
    { year: "2020", users: 11650 },
    { year: "2022", users: 22000 },
    { year: "2024", users: 38016 },
    { year: "2026", users: 50680 },
  ];
  
  return (
    <>
      <Container>
        {/* Heading */}
        <Box>
          <Typography>This's A Dashboard For Meals </Typography>
        </Box>
        {/* Body  */}
        <Box>
          <Grid item xs={12} lg={7}>
            <ChartCard
              title="User Ecosystem Growth"
              icon={<Group color="primary" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mealsData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    hide={window.innerWidth < 500}
                    tick={{ fill: isDark ? "#fff" : "#666", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    labelKey="year"
                    contentStyle={{
                      borderRadius: "15px",
                      border: "none",
                      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#6366F1"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>
        </Box>
      </Container>
      <Outlet />
    </>
  );
}
