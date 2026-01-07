import { useContext, useState } from "react";
import PreApp from "./PreApp";
import { ShowCart } from "../Context/MainContext";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function ContApp({ mode, setMode }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
  });

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") return;

    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const { show, setShow } = useContext(ShowCart);

  const faUser = useSelector((state) => state.facebook.user);
  const goUser = useSelector((state) => state.google.user);
  const maUser = useSelector((state) => state.email.user);

  const isLoginData = { faUser: faUser, goUser: goUser, maUser: maUser };
  // eslint-disable-next-line no-extra-boolean-cast
  const bool = !!!isLoginData;

  const location = useLocation();

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
