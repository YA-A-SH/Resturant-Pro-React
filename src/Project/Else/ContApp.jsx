// Hooks

import { useContext, useState } from "react";

// Components
import PreApp from "./PreApp";

//Context
import { ShowCart } from "../Context/MainContext";

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
