import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResetState, resetPassword } from "../../RTK/MainSlice";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function DialogReset({ open, setOpen }) {
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
      <DialogTitle>Reset Password</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="Email"
          type="email"
          sx={{ mt: 1 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Reset email sent successfully ✅
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Sorry Something Went Wrong Try Again Later
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={loading || !email}
          onClick={() => dispatch(resetPassword(email))}
        >
          {loading ? "Sending..." : "Send Link"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
