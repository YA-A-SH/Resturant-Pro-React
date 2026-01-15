import { useTheme } from "@mui/material";
import AboutUs from "./PresenterAboutUs";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ChefsContext } from "../Context/MainContext";

export default function ContAboutUs() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { chefs } = useContext(ChefsContext);
  const stats = [
    { number: "50000+", label: "Happy Customers" },
    { number: "120k+", label: "Orders" },
    { number: "10+", label: "Years Experience" },
    { number: "24/7", label: "Support", static: true }, // 👈
  ];

  useEffect(() => {
    document.title = "Zeus Restaurant | About Us";
  }, []);

  // Original Theme For About Us Comp

  const cardBg =
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff";
  const textSecondary = theme.palette.text.secondary;

  const isDark = theme.palette.mode === "dark";

  return (
    <AboutUs
      theme={theme}
      navigate={navigate}
      textSecondary={textSecondary}
      cardBg={cardBg}
      teamMembers={chefs}
      stats={stats}
      isDark={isDark}
    />
  );
}
