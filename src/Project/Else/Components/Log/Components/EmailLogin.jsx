import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail, selectEmailAuthLoading } from "@user/RTK/LogSlice";
import { useNavigate } from "react-router-dom";

const EmailLogin = React.memo(() => {
  const mailLoading = useSelector(selectEmailAuthLoading);
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

  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="1000"
        mb={1}
        sx={{
          background: `linear-gradient(45deg, #fee76a, #fee76a, ${theme.palette.primary.light}, #fee76a , #fee76a)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: -1,
          fontSize: { xxs: "1.5rem", ss: "2.2rem", ms: "2.1rem", md: "2.8rem" },
          mb: 4,
        }}
      >
        {t("Login By Email")}
      </Typography>
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
        disableElevation
        sx={{
          backgroundColor: "#fffdfa",
          color: theme.palette.primary.custom,
          border: `2px solid ${theme.palette.primary.custom}`,
          py: 1.3,
          mb: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 5px 20px #f7d72487",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px #f7d724",
          },
        }}
        startIcon={mailLoading && <CircularProgress size={20} />}
      >
        <p style={{ margin: 0, marginTop: 2, marginRight: 10 }}>{t("Login")}</p>
      </Button>
    </>
  );
});
export default EmailLogin;
