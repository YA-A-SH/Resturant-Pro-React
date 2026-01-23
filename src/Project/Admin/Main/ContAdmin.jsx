import { useEffect } from "react";
import PreAdmin from "./PreAdmin";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function ContAdmin() {
  useEffect(() => {
    document.title = "Zeus Restaurant | Admin";
  }, []);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  return (
    <>
      <PreAdmin theme={theme} isDark={isDark} navigate={navigate} />
    </>
  );
}
