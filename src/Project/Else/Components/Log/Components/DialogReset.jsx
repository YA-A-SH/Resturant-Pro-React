import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResetState, resetPassword } from "@user/RTK/MainSlice";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function DialogReset({ open, setOpen, t }) {
  const { loading, success, error } = useSelector((st) => st.reset);
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
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle>{t("Reset Password")}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label={t("Email")}
          type="email"
          sx={{ mt: 1 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {t("Reset email sent successfully")} ✅
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {t("Sorry Something Went Wrong Try Again Later")}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t("Cancel")}</Button>
        <Button
          variant="contained"
          disabled={loading || !email}
          onClick={() => dispatch(resetPassword(email))}
        >
          {loading ? t("Sending...") : t("Send Link")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
