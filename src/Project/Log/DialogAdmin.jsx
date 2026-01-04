import { useEffect } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
};

export default function DialogAdmin({
  open,
  trys,
  setTrys,
  setIsAval,
  handleDialogClose,
  secNum,
  setSecNum,
  isAval,
  handleCheck,
  openSnak,
  handleSnackbarClose,
}) {
  useEffect(() => {
    if (trys === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAval(true);
      const timer = setTimeout(() => {
        setIsAval(false);
        setTrys(3);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [trys]);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle>Login As Admin</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="Enter You'r Secrete Number"
          sx={{ mt: 1 }}
          value={secNum}
          onChange={(e) => setSecNum(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!secNum || isAval}
          onClick={handleCheck}
        >
          Check The Secrete Number
        </Button>
      </DialogActions>
      <Snackbar
        open={openSnak}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ color: "white" }}
        >
          {trys === 0
            ? "You Use All You'r Attempts Try Again Later "
            : `Wrong Key You Have ${trys} Attempts Left`}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
