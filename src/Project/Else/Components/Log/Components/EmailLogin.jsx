import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "@user/RTK/MainSlice";
import { useNavigate } from "react-router-dom";

const EmailLogin = React.memo(() => {
  const { loading: mailLoading } = useSelector((st) => st.email);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", pw: "" });

  const handleEmailLogin = useCallback(async () => {
    const res = await dispatch(
      loginWithEmail({ email: user.email, password: user.pw }),
    );
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/", { state: { loginSuccess: true } });
    }
  }, [dispatch, navigate, user.email, user.pw]);

  return (
    <>
      <TextField
        label={t("Email Address")}
        fullWidth
        sx={{ mb: 3 }}
        value={user?.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <TextField
        label={t("Password")}
        type="password"
        fullWidth
        sx={{ mb: 3 }}
        value={user?.pw}
        onChange={(e) => setUser({ ...user, pw: e.target.value })}
      />

      {/* Animated Button */}
      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleEmailLogin}
        disabled={mailLoading}
        sx={{
          py: 1.3,
          mb: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // ⚡ لازم
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(255,152,0,0.5)",
          },
        }}
        startIcon={mailLoading && <CircularProgress size={20} />}
      >
        {t("Login")}
      </Button>
    </>
  );
});
export default EmailLogin;
