import React, { useEffect, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import SnackbarComp from "@else/Components/Else/SnackbarComp";
import { useTranslation } from "react-i18next";
import LockPersonIcon from "@mui/icons-material/LockPerson";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAdmin = React.memo(
  ({
    open,
    trys,
    setTrys,
    isAval,
    setIsAval,
    handleDialogClose,
    secNum,
    setSecNum,
    handleCheck,
    openSnackbar,
    handleSnackbarClose,
  }) => {
    const { t } = useTranslation();

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
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            backgroundImage: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 3,
          }}
        >
          <LockPersonIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
          <DialogTitle
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main",
              p: 0,
            }}
          >
            {t("Login As Admin")}
          </DialogTitle>
        </Box>

        <DialogContent>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mb: 3, color: "text.secondary" }}
          >
            {t("Please enter your secure access key to continue")}
          </Typography>

          <TextField
            fullWidth
            autoFocus
            label={t("Secret Number")}
            type="password"
            variant="outlined"
            value={secNum}
            onChange={(e) => setSecNum(e.target.value)}
            disabled={isAval}
            error={trys < 3 && trys > 0}
            helperText={trys < 3 ? `${t("Attempts left")}: ${trys}` : ""}
            sx={{
              color: "primary.main",
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!secNum || isAval}
            onClick={handleCheck}
            sx={{
              borderRadius: "12px",
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {isAval ? t("Locked...") : t("Verify Access")}
          </Button>

          <Button
            onClick={handleDialogClose}
            fullWidth
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            {t("Cancel")}
          </Button>
        </DialogActions>

        <SnackbarComp
          openSnackbar={openSnackbar.openSnackbar}
          msg={
            trys === 0
              ? t("You Use All Your Attempts Try Again Later")
              : t("Wrong Key You Have") + " " + trys + " " + t("Attempts Left")
          }
          color="error"
          handleClose={handleSnackbarClose}
        />
      </Dialog>
    );
  },
);

export default DialogAdmin;
