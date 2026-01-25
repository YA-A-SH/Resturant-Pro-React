import { useTheme } from "@mui/material";
import AboutUs from "./PresenterAboutUs";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ChefsContext } from "../Context/MainContext";
import { useTranslation } from "react-i18next";

export default function ContAboutUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { chefs } = useContext(ChefsContext);
  const stats = [
    { number: "50000+", label: t("Happy Customers") },
    { number: "120k+", label: t("Orders") },
    { number: "10+", label: t("Years Experience") },
    { number: "24/7", label: t("Support"), static: true },
  ];

  useEffect(() => {
    document.title = t("Zeus Restaurant | About Us");
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
      t={t}
    />
  );
}
