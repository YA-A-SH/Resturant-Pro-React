import { Container, Grid, Paper, Box } from "@mui/material";
import ChartCard from "../../Components/ChartCard";
import { BlockRounded, Verified, Group } from "@mui/icons-material";
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
} from "recharts";

export default function UsersCharts({ isDark }) {
  const verifyUsers = [
    { year: "2015", users: 400, verifyUsers: 58 },
    { year: "2020", users: 11650, verifyUsers: 7403 },
    { year: "2022", users: 22000, verifyUsers: 16034 },
    { year: "2024", users: 38016, verifyUsers: 26052 },
    { year: "2026", users: 50680, verifyUsers: 44923 },
  ];

  const banUsers = [
    { year: "2015", banUsers: 13 },
    { year: "2020", banUsers: 190 },
    { year: "2022", banUsers: 163 },
    { year: "2024", banUsers: 220 },
    { year: "2026", banUsers: 12 },
  ];

  return (
    <Container maxWidth="xl" sx={{ mb: "30px", py: 4 }}>
      <Grid container spacing={3}>
        {/* Chart 1: Verified vs All Users */}
        <Grid item xs={12} lg={8}>
          <ChartCard
            title="User Growth & Verification"
            icon={<Verified sx={{ color: "#4caf50" }} />}
          >
            <Box sx={{ width: "100%", height: 350, mt: 2 }}>
              <ResponsiveContainer>
                <BarChart
                  data={verifyUsers}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366F1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorVerify"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
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
                    tick={{ fill: isDark ? "#aaa" : "#666", fontSize: 13 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: isDark ? "#aaa" : "#666", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<CustomTooltip isDark={isDark} />}
                    cursor={{
                      fill: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: "20px" }}
                  />
                  <Bar
                    name="All Users"
                    dataKey="users"
                    fill="url(#colorUsers)"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                  <Bar
                    name="Verified Users"
                    dataKey="verifyUsers"
                    fill="url(#colorVerify)"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
        </Grid>

        {/* Chart 2: Banned Users */}
        <Grid item xs={12} lg={4}>
          <ChartCard
            title="Security Overview (Banned)"
            icon={<BlockRounded sx={{ color: "#ef4444" }} />}
          >
            <Box sx={{ width: "100%", height: 350, mt: 2 }}>
              <ResponsiveContainer>
                <BarChart data={banUsers}>
                  <defs>
                    <linearGradient id="colorBan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={1} />
                      <stop
                        offset="95%"
                        stopColor="#fb7185"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: isDark ? "#aaa" : "#666", fontSize: 13 }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="banUsers"
                    radius={[20, 20, 20, 20]}
                    barSize={15}
                  >
                    {banUsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="url(#colorBan)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
        </Grid>
      </Grid>
    </Container>
  );
}

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={10}
        sx={{
          p: 2,
          borderRadius: "12px",
          bgcolor: isDark ? "#1e1e1e" : "#fff",
          border: "none",
        }}
      >
        <Box
          sx={{ mb: 1, fontWeight: "bold", color: isDark ? "#fff" : "#333" }}
        >{`Year: ${label}`}</Box>
        {payload.map((entry, index) => (
          <Box
            key={index}
            sx={{
              color: entry.color,
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: entry.color,
              }}
            />
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};
