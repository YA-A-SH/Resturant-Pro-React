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
import SnackbarComp from "../../../Else/Components/SnackbarComp";

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
  t,
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
          p: 2,
        },
      }}
    >
      <DialogTitle>{t("Login As Admin")}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label={t("Enter You'r Secrete Number")}
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
          {t("Check The Secrete Number")}
        </Button>
      </DialogActions>

      <SnackbarComp
        openSnackbar={openSnackbar.openSnackbar}
        msg={
          trys === 0
            ? t("You Use All You'r Attempts Try Again Later")
            : t("Wrong Key You Have") + " " + trys + " " + t("Attempts Left")
        }
        color="error"
        handleClose={handleSnackbarClose}
      />
    </Dialog>
  );
}
