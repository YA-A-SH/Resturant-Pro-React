import {
  HomeRounded,
  PersonRounded,
  RestaurantRounded,
  LocalBarRounded,
  CakeRounded,
  InfoRounded,
  AdminPanelSettings,
  RestaurantMenu,
  SupervisedUserCircle,
  LocalBar,
} from "@mui/icons-material";
import PreNav from "./PresenterNavbar";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { IsAdminContext } from "../Context/MainContext";
import { useTranslation } from "react-i18next";

export default function ContNav({ showNav, setShowNav, setMode }) {
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";
  const closeNav = () => setShowNav(false);
  const { isAdmin } = useContext(IsAdminContext);
  const { t } = useTranslation();
  const menuItems = isAdmin
    ? [
        {
          label: t("Admin Dashboard"),
          path: "/admin",
          icon: <AdminPanelSettings fontSize="small" />,
        },
        {
          label: t("Manage Users"),
          path: "/admin/manage-users",
          icon: <SupervisedUserCircle fontSize="small" />,
        },
        {
          label: t("ManageMeals"),
          path: "/admin/manageMeals",
          icon: <RestaurantMenu fontSize="small" />,
        },
        {
          label: t("Manage Drinks"),
          path: "/admin/manageDrinks",
          icon: <LocalBar fontSize="small" />,
        },
        {
          label: t("Manage Sweets"),
          path: "/admin/manageSweets",
          icon: <CakeRounded fontSize="small" />,
        },
      ]
    : [
        { label: t("Home"), path: "/", icon: <HomeRounded fontSize="small" /> },
        {
          label: t("Profile"),
          path: "/profile",
          icon: <PersonRounded fontSize="small" />,
        },
        {
          label: t("Meals"),
          path: "/meals",
          icon: <RestaurantRounded fontSize="small" />,
        },
        {
          label: t("Drinks"),
          path: "/drinks",
          icon: <LocalBarRounded fontSize="small" />,
        },
        {
          label: t("Sweets"),
          path: "/sweet",
          icon: <CakeRounded fontSize="small" />,
        },
        {
          label: t("About us"),
          path: "/aboutUs",
          icon: <InfoRounded fontSize="small" />,
        },
      ];

  return (
    <>
      <PreNav
        t={t}
        showNav={showNav}
        menuItems={menuItems}
        location={location}
        closeNav={closeNav}
        isDark={isDark}
        setMode={setMode}
        isAdmin={isAdmin}
      />
    </>
  );
}
