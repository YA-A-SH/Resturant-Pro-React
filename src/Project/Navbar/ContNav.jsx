import {
  HomeRounded,
  PersonRounded,
  RestaurantRounded,
  LocalBarRounded,
  CakeRounded,
  InfoRounded,
} from "@mui/icons-material";
import PreNav from "./PresenterNavbar";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";

export default function ContNav({ showNav, setShowNav, setMode }) {
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";

  const closeNav = () => setShowNav(false);

  const menuItems = [
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
    { label: "Sweets", path: "/sweet", icon: <CakeRounded fontSize="small" /> },
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
      />
    </>
  );
}
