// Hooks

import { useContext, useState } from "react";

// Components
import PreApp from "./PreApp";

//Context
import { IsAdminContext, ShowCart } from "../User/Context/MainContext";

//Lib
import { useLocation } from "react-router-dom";

export default function ContApp({ mode, setMode }) {
  // Hooks

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
  });
  const { setShow } = useContext(ShowCart);
  const { isAdmin } = useContext(IsAdminContext);

  const location = useLocation();

  // Functions

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // UI
  return (
    <PreApp
      isAdmin={isAdmin}
      mode={mode}
      setMode={setMode}
      setShowCart={setShow}
      location={location}
      snackbar={snackbar}
      setSnackbar={setSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
}
