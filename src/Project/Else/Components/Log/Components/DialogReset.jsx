import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResetState,
  resetErrorSelector,
  resetLoadingSelector,
  resetPassword,
  resetSuccessSelector,
} from "@user/RTK/LogSlice";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const DialogReset = React.memo(({ open, setOpen }) => {
  const { t } = useTranslation();
  const success = useSelector(resetSuccessSelector);
  const loading = useSelector(resetLoadingSelector);
  const error = useSelector(resetErrorSelector);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(clearResetState());
    setEmail("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "10px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontWeight: "bold", fontSize: "1.5rem" }}>
        {t("Reset Password")}
        <Typography variant="body2" color="text.secondary">
          {t("Enter your email to receive a reset link")}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          fullWidth
          autoFocus
          label={t("Email Address")}
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mt: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        {success && (
          <Alert severity="success" sx={{ mt: 2, borderRadius: "10px" }}>
            {t("Reset email sent successfully")} ✅
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: "10px" }}>
            {typeof error === "string"
              ? error
              : t("Sorry Something Went Wrong")}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
          sx={{ color: "#777", fontWeight: "bold" }}
        >
          {t("Cancel")}
        </Button>

        <Button
          variant="contained"
          disabled={loading || !email}
          loading={loading}
          onClick={() => dispatch(resetPassword(email))}
          sx={{
            borderRadius: "10px",
            px: 4,
            bgcolor: "primary.main",
            boxShadow: "none",
            "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
          }}
        >
          {t("Send Link")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogReset;
