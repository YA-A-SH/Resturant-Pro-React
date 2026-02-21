import { Error, Facebook, Google } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "@user/RTK/MainSlice";
import React from "react";

const FacGoogleLogin = React.memo(() => {
  const { loading: googleLoading, error: googleError } = useSelector(
    (st) => st.google,
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const res = await dispatchEvent(loginWithGoogle());
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
