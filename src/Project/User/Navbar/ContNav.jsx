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

export default function ContNav({ showNav, setShowNav, setMode }) {
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";
  const closeNav = () => setShowNav(false);
  const { isAdmin } = useContext(IsAdminContext);

  const menuItems = isAdmin
    ? [
        {
          label: "Admin Dashboard",
          path: "/admin",
          icon: <AdminPanelSettings fontSize="small" />,
        },
        {
          label: "Manage Users",
          path: "/admin/manageUsers",
          icon: <SupervisedUserCircle fontSize="small" />,
        },
        {
          label: "Manage Meals",
          path: "/admin/manageMeals",
          icon: <RestaurantMenu fontSize="small" />,
        },
        {
          label: "Manage Drinks",
          path: "/admin/manageDrinks",
          icon: <LocalBar fontSize="small" />,
        },
        {
          label: "Manage Sweets",
          path: "/admin/manageSweets",
          icon: <CakeRounded fontSize="small" />,
        },
      ]
    : [
        { label: "Home", path: "/", icon: <HomeRounded fontSize="small" /> },
        {
          label: "Profile",
          path: "/profile",
          icon: <PersonRounded fontSize="small" />,
        },
        {
          label: "Meals",
          path: "/meals",
          icon: <RestaurantRounded fontSize="small" />,
        },
        {
          label: "Drinks",
          path: "/drinks",
          icon: <LocalBarRounded fontSize="small" />,
        },
        {
          label: "Sweets",
          path: "/sweet",
          icon: <CakeRounded fontSize="small" />,
        },
        {
          label: "About us",
          path: "/aboutUs",
          icon: <InfoRounded fontSize="small" />,
        },
      ];

  return (
    <>
      <PreNav
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
