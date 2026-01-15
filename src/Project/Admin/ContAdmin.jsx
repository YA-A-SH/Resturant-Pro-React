import { useEffect } from "react";
import PreAdmin from "./PreAdmin";
import { useTheme } from "@emotion/react";

export default function ContAdmin() {
  useEffect(() => {
    document.title = "Zeus Restaurant | Admin";
  }, []);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const GRADIENTS = {
    primary: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
    secondary: "linear-gradient(135deg, #3B82F6 0%, #2DD4BF 100%)",
    warning: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    success: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
  };
  return (
    <>
      <PreAdmin isDark={isDark} GRADIENTS={GRADIENTS} />
    </>
  );
}
