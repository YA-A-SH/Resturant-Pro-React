import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import {
  AddRounded,
  TrendingUpRounded,
  AccountBalanceWalletRounded,
  ShoppingCartRounded,
  MonetizationOnRounded,
  CalendarMonthRounded,
  FastfoodRounded,
} from "@mui/icons-material";
import KpiCard from "./BaseComponents/Cards.jsx";
import FooterSection from "./BaseComponents/Footer.jsx";
import Charts from "./BaseComponents/Charts.jsx";
import { useContext, useState } from "react";
import AddDishModal from "./BaseComponents/AddDishModal.jsx";
import { OpenSnackbarContext } from "../../User/Context/MainContext.jsx";
import SnackbarComp from "../../Else/Components/SnackbarComp.jsx";
export default function BaseManage({
  theme,
  timeFilter,
  setTimeFilter,
  type,
  totalSales,
  totalCosts,
  netProfit,
  mealsSells,
  topFiveDishes,
  drinksSells,
  topFiveDrinks,
  sweetsSells,
  topFiveSweets,
  topDish,
  topDishOrders,
  todayOrders,
}) {
  const [openAddDish, setOpenAddDish] = useState(false);
  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      openSnackbar: false,
      message: "",
      color: "",
    });
  };
  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/*  Header Section  */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          // جعل العناصر في المنتصف في الموبايل وفوق بعض
          alignItems={{ xs: "stretch", md: "center" }}
          spacing={3}
          mb={5}
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                letterSpacing: -2,
                lineHeight: 1,
                fontSize: {
                  xxs: "1.8rem",
                  xs: "2.6rem",
                  md: "3.5rem",
                  lg: "4.5rem",
                },
              }}
            >
              Analytics{" "}
              <Box component="span" sx={{ color: "admin.main" }}>
                Overview
              </Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight={500}
              sx={{ textAlign: { xxs: "center" }, mt: 3 }}
            >
              Monitoring performance for{" "}
              <span style={{ color: theme.palette.admin.main }}>{type}</span>{" "}
              category
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            {/* Time Filter */}
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 150 },
                flex: { xs: 1, md: "none" },
                mt: 2,
                mb: 2,
              }}
            >
              <Select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 700,
                  bgcolor: "background.paper",
                }}
                IconComponent={CalendarMonthRounded}
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<AddRounded />}
              fullWidth={{ xs: true, sm: false }}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                fontWeight: 800,
                boxShadow: theme.shadows[4],
                whiteSpace: "nowrap",
                bgcolor: theme.palette.admin.main,
              }}
              onClick={() => setOpenAddDish(true)}
            >
              Add New Dish
            </Button>
          </Stack>
        </Stack>

        <AddDishModal
          open={openAddDish}
          setOpen={setOpenAddDish}
          type={type}
          setOpenSnackbar={setOpenSnackbar}
        />

        {/* Stats Cards*/}
        <Grid
          container
          spacing={3}
          mb={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <KpiCard
              title="Total Sales"
              value={totalSales}
              icon={<MonetizationOnRounded />}
              trend="+14%"
              isUp={true}
              color="#3B82F6"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <KpiCard
              title="Total Costs"
              value={totalCosts}
              icon={<AccountBalanceWalletRounded />}
              trend="+5%"
              isUp={false}
              color="#EF4444"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <KpiCard
              title="Net Profit"
              value={netProfit}
              icon={<TrendingUpRounded />}
              trend="+18%"
              isUp={true}
              color="#10B981"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <KpiCard
              title={
                timeFilter === "today"
                  ? "Today's Orders"
                  : timeFilter === "week"
                    ? "This Week's Orders"
                    : "This Month's Orders"
              }
              value={todayOrders}
              icon={<ShoppingCartRounded />}
              trend="-2%"
              isUp={false}
              color="#6366F1"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <KpiCard
              title="Top Dish"
              value={topDish}
              icon={<FastfoodRounded />}
              subValue={`${topDishOrders} Orders`}
              color="#F59E0B"
            />
          </Grid>
        </Grid>

        {/* Charts */}

        <Charts
          theme={theme}
          time={timeFilter}
          firstChartData={
            type === "meals"
              ? mealsSells
              : type === "drinks"
                ? drinksSells
                : sweetsSells
          }
          secondChartData={
            type === "meals"
              ? topFiveDishes
              : type === "drinks"
                ? topFiveDrinks
                : topFiveSweets
          }
        />
        {/* Footer  */}
        <FooterSection theme={theme} />
      </Box>
      <SnackbarComp
        openSnackbar={openSnackbar.openSnackbar}
        msg={openSnackbar.message}
        color={openSnackbar.color}
        handleClose={handleCloseSnackbar}
      />
    </Box>
  );
}
