import { Error, Facebook, Google } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginWithGoogle,
  selectGoogleAuthError,
  selectGoogleAuthLoading,
} from "@user/RTK/LogSlice";
import React from "react";

const FacGoogleLogin = React.memo(() => {
  const googleLoading = useSelector(selectGoogleAuthLoading);
  const googleError = useSelector(selectGoogleAuthError);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const res = await dispatch(loginWithGoogle());
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/", { state: { loginSuccess: true } });
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          disabled
          startIcon={<Facebook />}
          sx={{
            borderColor: "#1877F2",
            color: "#1877F2",
          }}
        >
          {t("Coming Soon")}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            googleLoading ? (
              <CircularProgress size={20} />
            ) : googleError ? (
              <Error color="error" />
            ) : (
              <Google />
            )
          }
          sx={(theme) => ({
            borderColor: "primary.main",
            color: "primary.main",
            transition: "0.3s",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255,152,0,0.15)"
                  : "rgba(255,152,0,0.08)",
              transform: "translateY(-2px)",
            },
          })}
          onClick={handleGoogleLogin}
        >
          {t("Google")}
        </Button>
      </Box>
    </>
  );
});
export default FacGoogleLogin;
