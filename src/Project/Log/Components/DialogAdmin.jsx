import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import SnackbarComp from "../../Else/Components/SnackbarComp";

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
  openSnackbar,
  handleSnackbarClose,
}) {
  useEffect(() => {
    if (trys === 0) {
      setIsAval(true);
      const timer = setTimeout(() => {
        setIsAval(false);
        setTrys(3);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [setIsAval, setTrys, trys]);

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

      <SnackbarComp
        openSnackbar={openSnackbar}
        msg={
          trys === 0
            ? "You Use All You'r Attempts Try Again Later "
            : `Wrong Key You Have ${trys} Attempts Left`
        }
        color="error"
        handleClose={handleSnackbarClose}
      />
    </Dialog>
  );
}
