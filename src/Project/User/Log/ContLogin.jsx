import { useEffect, useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail, loginWithGoogle } from "../RTK/MainSlice";

export default function ContLogin() {
  const [user, setUser] = useState({ email: "", pw: "" });
  const [openReset, setOpenReset] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Zeus Restaurant | Login";
  }, []);

  const { loading: googleLoading, error: googleError } = useSelector(
    (st) => st.google
  );
  const { loading: mailLoading } = useSelector((st) => st.email);

  const handleEmailLogin = async () => {
    const res = await dispatch(
      loginWithEmail({ email: user.email, password: user.pw })
    );
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/", { state: { loginSuccess: true } });
    }
  };

  const handleGoogleLogin = async () => {
    const res = await dispatch(loginWithGoogle());
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/", { state: { loginSuccess: true } });
    }
  };

  return (
    <Login
      user={user}
      setUser={setUser}
      handleEmailLogin={handleEmailLogin}
      mailLoading={mailLoading}
      setOpenReset={setOpenReset}
      googleLoading={googleLoading}
      googleError={googleError}
      handleGoogleLogin={handleGoogleLogin}
      openReset={openReset}
      openAdmin={openAdmin}
      setOpenAdmin={setOpenAdmin}
    />
  );
}
