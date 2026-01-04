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
import { useContext } from "react";
import { ShowContext } from "../Context/MainContext";

export default function ContNav({ showIt, setMode }) {
  const { setShow } = useContext(ShowContext);
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";

  const closeNav = () => setShow(false);

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
        showIt={showIt}
        setMode={setMode}
        menuItems={menuItems}
        closeNav={closeNav}
        isDark={isDark}
        location={location}
      />
    </>
  );
}
