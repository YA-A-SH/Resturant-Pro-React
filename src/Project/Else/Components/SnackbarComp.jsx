import { Alert, Snackbar } from "@mui/material";

export default function SnackbarComp({
  openSnackbar,
  msg,
  color,
  handleClose,
}) {
  return (
    <>
      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={color}
          variant="filled"
          sx={{
            borderRadius: "15px",
            px: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
