import { Error, Facebook, Google } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";

export default function FacGoogleLogin({
  googleLoading,
  googleError,
  handleGoogleLogin,
  t
}) {
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
}
