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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isUserVerified = type === "user" && data?.isVerified;
  const isBlocked = type === "user" && data?.isBlocked;

  const configs = {
    chef: {
      mainColor: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      tag: t("Master Chef"),
      chartLabel: t("Recipes Created"),
      icon: <RestaurantMenuRounded />,
      details: [
        t("Certified Sous Chef"),
        t("Worked at Hilton (5 yrs)"),
        t("Expert in Italian Cuisine"),
      ],
    },
    manager: {
      mainColor: theme.palette.admin.main,
      gradient: theme.palette.admin.gradient,
      tag: "Admin Panel",
      chartLabel: "System Logins",
      icon: <AdminPanelSettingsRounded />,
      details: [
        t("Access Level: Full"),
        t("Last Audit: 2 days ago"),
        t("Manager since 2021"),
      ],
    },
    user: {
      mainColor: isUserVerified ? "#10B981" : "#F59E0B",
      gradient: isUserVerified
        ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
        : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      tag: isUserVerified ? "Verified VIP" : "Vip Member",
      chartLabel: t("Total Orders"),
      icon: <ShoppingBagRounded />,
      details: [
        isUserVerified
          ? t("Trust Level: Identity Verified")
          : t("Trust Level: Pending"),
        t("Top 5% of Customers"),
        t("Member since 2024"),
      ],
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
        t={t}
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
          t={t}
          type={type}
          configs={configs}
          theme={theme}
          chartData={chartData}
        />
        <BaseDetails
          t={t}
          configs={configs}
          type={type}
          isVerified={isUserVerified}
          isBlocked={isBlocked}
        />
        <EditSalaryPopup
          id={data?.id}
          open={state1}
          setOpenEditSalaryPopup={setState1}
          mainColor="#10B981"
        />
        <DeleteChefPopup
          open={state2}
          setOpenDeleteChefPopup={setState2}
          data={data}
          isInProfile={isInProfile}
          setIsProfile={setIsProfile}
        />
      </Grid>
    </Container>
  );
}
