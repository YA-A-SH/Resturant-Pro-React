import { useTheme } from "@mui/material";
import AboutUs from "./PresenterAboutUs";
import { useNavigate } from "react-router-dom";

export default function ContAboutUs() {
  const teamMembers = [
    {
      name: "Chef S.Ramos",
      role: "Head Chef",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      name: "Sara",
      role: "Pastry Chef",
      img: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Ali",
      role: "Sous Chef",
      img: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];
  const stats = [
    { number: "50000+", label: "Happy Customers" },
    { number: "120k+", label: "Orders" },
    { number: "10+", label: "Years Experience" },
    { number: "24/7", label: "Support", static: true }, // 👈
  ];

  const navigate = useNavigate();
  const theme = useTheme();
  const cardBg =
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff";
  const textSecondary = theme.palette.text.secondary;
  const hoverShadow =
    theme.palette.mode === "dark"
      ? "0 10px 25px rgba(255,111,0,0.4)"
      : "0 10px 25px rgba(255,152,0,0.3)";
  const heroBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(15deg, #1e1e1e, #ff6f00)"
      : "linear-gradient(15deg, #ebebeb, #ffd89b)";

  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === "dark";

  return (
    <AboutUs
      theme={theme}
      heroBg={heroBg}
      navigate={navigate}
      textSecondary={textSecondary}
      cardBg={cardBg}
      teamMembers={teamMembers}
      hoverShadow={hoverShadow}
      stats={stats}
      isDark={isDark}
    />
  );
}
