import { useNavigate } from "react-router-dom";
import { Container, IconButton, Grid, alpha, useTheme } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ShoppingBagRounded,
  RestaurantMenuRounded,
  AdminPanelSettingsRounded,
} from "@mui/icons-material";

import BaseHeader from "./BaseHeader";
import BaseCharts from "./BaseCharts";
import BaseDetails from "./BaseDetails";
import EditSalaryPopup from "../EditSalaryPopup";
import DeleteChefPopup from "../DeleteChefPopup";

export default function ProfileView({
  data,
  type,
  setState1,
  setState2,
  state1,
  state2,
  isInProfile,
  setIsProfile,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const configs = {
    chef: {
      mainColor: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      tag: "Master Chef",
      chartLabel: "Recipes Created",
      icon: <RestaurantMenuRounded />,
      details: [
        "Certified Sous Chef",
        "Worked at Hilton (5 yrs)",
        "Expert in Italian Cuisine",
      ],
    },
    manager: {
      mainColor: theme.palette.admin.main,
      gradient: theme.palette.admin.gradient,
      tag: "Admin Panel",
      chartLabel: "System Logins",
      icon: <AdminPanelSettingsRounded />,
      details: [
        "Access Level: Full",
        "Last Audit: 2 days ago",
        "Manager since 2021",
      ],
    },
    user: {
      mainColor: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      tag: "Vip Member",
      chartLabel: "Total Orders",
      icon: <ShoppingBagRounded />,
      details: ["Top 5% of Customers", "Favorite: Pasta", "Member since 2024"],
    },
  }[type] || {
    mainColor: "#6366F1",
    gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    tag: "Staff",
  };

  const chartData =
    type === "chef"
      ? data?.rate
      : type === "manager"
        ? data?.income
        : [
            { month: "Jan", value: 10 },
            { month: "Feb", value: 15 },
            { month: "Mar", value: 20 },
          ];
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ mb: 2, bgcolor: alpha(configs.mainColor, 0.1) }}
      >
        <ArrowBackIosNewRounded
          fontSize="small"
          sx={{ color: configs.mainColor }}
        />
      </IconButton>

      {/* --- Header Card --- */}

      <BaseHeader
        configs={configs}
        data={data}
        isDark={isDark}
        theme={theme}
        type={type}
        setSalaryState={setState1}
        setDeleteState={setState2}
      />

      {/* --- Main Content Grid --- */}

      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {" "}
        <BaseCharts
          type={type}
          configs={configs}
          theme={theme}
          chartData={chartData}
        />
        <BaseDetails configs={configs} type={type} />
        <EditSalaryPopup
          id={data.id}
          open={state1}
          setOpenEditSalaryPopup={setState1}
          mainColor="#10B981"
        />
        <DeleteChefPopup
          open={state2}
          setOpenDeleteChefPopup={ setState2}
          data={data}
          isInProfile={isInProfile}
          setIsProfile={setIsProfile}
        />
      </Grid>
    </Container>
  );
}
