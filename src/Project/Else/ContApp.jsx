import { useContext, useState } from "react";
import PreApp from "./PreApp";
import { ShowCart } from "../Context/MainContext";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function ContApp({ mode, setMode }) {
  const [openAlert2, setOpenAlert2] = useState(false);
  const [openAlert3, setOpenAlert3] = useState(false);

  const { show, setShow } = useContext(ShowCart);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert2(false);
    setOpenAlert3(false);
  };
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
      setOpenAlert2={setOpenAlert2}
      openAlert2={openAlert2}
      handleClose={handleClose}
      openAlert3={openAlert3}
      setOpenAlert3={setOpenAlert3}
      bool={bool}
      location={location}
    />
  );
}
