import { Grid } from "@mui/material";
import ChartCard from "./ChartCard";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  Group,
  Restaurant,
  SentimentVeryDissatisfied,
  TrendingUp,
} from "@mui/icons-material";

export default function Charts({ GRADIENTS, isDark }) {
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
  const worstFiveDishes = [
    { name: "Šúĺlance", orders: 10 },
    { name: "Skoleboller", orders: 3 },
    { name: "Fritters", orders: 17 },
    { name: "Speculaas", orders: 1 },
    { name: "Donut", orders: 6 },
  ];
  const COLORS = ["#6366F1", "#2DD4BF", "#F59E0B", "#EF4444"];

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* User Growth */}
        <Grid item xs={12} lg={7}>
          <ChartCard
            title="User Ecosystem Growth"
            icon={<Group color="primary" />}
            gradient={GRADIENTS.primary}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usersData}>
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

        {/* Sales Distribution */}
        <Grid item xs={12} lg={5}>
          <ChartCard
            title="Revenue Stream"
            icon={<TrendingUp color="secondary" />}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={percentageOfDishSales}
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={8}
                  dataKey="orders"
                >
                  {percentageOfDishSales.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Top Dishes */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Elite Performance Dishes"
            icon={<Restaurant sx={{ color: "#10B981" }} />}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTenDishes}>
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.1)" }} />
                <Bar dataKey="Dish" radius={[10, 10, 0, 0]}>
                  {topTenDishes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#6366F1" : "#2DD4BF"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Worst Dishes */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Underperforming Items"
            icon={<SentimentVeryDissatisfied sx={{ color: "#EF4444" }} />}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={worstFiveDishes}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  hide={window.innerWidth < 500}
                />
                <Tooltip />
                <Line
                  type="step"
                  dataKey="orders"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#EF4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
}
