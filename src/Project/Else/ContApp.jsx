import React, { useCallback, useContext } from "react";
import PreApp from "./PreApp";
import { OpenSnackbarContext } from "./Components/Context/MainContext";

const ContApp = React.memo(() => {
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

  // UI
  return <PreApp handleCloseSnackbar={handleCloseSnackbar} />;
});

export default ContApp;
