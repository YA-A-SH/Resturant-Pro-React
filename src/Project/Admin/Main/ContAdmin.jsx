import { useEffect } from "react";
import PreAdmin from "./PreAdmin";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ContAdmin() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("Zeus Restaurant | Admin");
  }, []);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  return (
    <>
      <PreAdmin theme={theme} isDark={isDark} navigate={navigate} t={t} />
    </>
  );
}
