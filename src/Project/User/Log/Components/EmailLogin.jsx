import { Button, CircularProgress, TextField } from "@mui/material";

export default function EmailLogin({
  user,
  setUser,
  handleEmailLogin,
  mailLoading,
}) {
  return (
    <>
      <TextField
        label="Email Address"
        fullWidth
        sx={{ mb: 3 }}
        value={user?.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <TextField
        label="Password"
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
        Login
      </Button>
    </>
  );
}
