// Hooks

import { useContext, useState } from "react";

// Components

import PreApp from "./PreApp";

//Context

import { ShowCart } from "../Context/MainContext";

//Lib

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ContApp({ mode, setMode }) {
  // Hooks
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
  });

  const { show, setShow } = useContext(ShowCart);

  const location = useLocation();

  // Selectors

  const faUser = useSelector((state) => state.facebook.user);
  const goUser = useSelector((state) => state.google.user);
  const maUser = useSelector((state) => state.email.user);

  // Variables
  const isLoginData = { faUser: faUser, goUser: goUser, maUser: maUser };
  // eslint-disable-next-line no-extra-boolean-cast
  const bool = !!!isLoginData;

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
      ShowCart={show}
      bool={bool}
      location={location}
      snackbar={snackbar}
      setSnackbar={setSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
}
