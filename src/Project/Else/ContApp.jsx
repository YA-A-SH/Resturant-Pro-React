import React, { useCallback, useContext, useEffect } from "react";
import PreApp from "./PreApp";
import { useTranslation } from "react-i18next";
import { OpenSnackbarContext } from "./Components/Context/MainContext";

const ContApp = React.memo(() => {
  const { i18n } = useTranslation();
  const { setOpenSnackbar } = useContext(OpenSnackbarContext);

  const handleCloseSnackbar = useCallback(
    (reason) => {
      if (reason === "clickaway") return;
      setOpenSnackbar((prev) => ({
        ...prev,
        open: false,
      }));
    },
    [setOpenSnackbar],
  );

  useEffect(() => {
    JSON.parse(localStorage.getItem("lang")) === "AR"
      ? i18n.changeLanguage("ar")
      : i18n.changeLanguage("en");
  }, []);

  // UI
  return <PreApp handleCloseSnackbar={handleCloseSnackbar} />;
});

export default ContApp;
