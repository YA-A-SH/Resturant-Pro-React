import React, { useCallback, useContext, useState } from "react";
import DialogAdmin from "./DialogAdmin";
import { useNavigate } from "react-router-dom";
import {
  IsAdminContext,
  OpenSnackbarContext,
} from "@else/Components/Context/MainContext";

const ContAdminDialog = React.memo(({ open, setOpen }) => {
  const [secNum, setSecNum] = useState("");
  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);
  const [trys, setTrys] = useState(3);
  const [isAval, setIsAval] = useState(false);
  const secreteNumber = "770304";
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(IsAdminContext);

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    setSecNum("");
  }, [setOpen]);

  const handleSnackbarClose = useCallback(
    (_, reason) => {
      if (reason === "clickaway") return;
      setOpenSnackbar({ ...openSnackbar, openSnackbar: false });
    },
    [openSnackbar, setOpenSnackbar],
  );

  const handleCheck = useCallback(() => {
    if (secNum === secreteNumber) {
      navigate("/admin");
      setIsAdmin(true);
      localStorage.setItem("isAdmin", true);
    } else {
      setOpenSnackbar(true);
    }
    setTrys(trys - 1);
  }, [navigate, secNum, setIsAdmin, setOpenSnackbar, trys]);

  return (
    <>
      <DialogAdmin
        trys={trys}
        open={open}
        secNum={secNum}
        isAval={isAval}
        openSnackbar={openSnackbar}
        setOpen={setOpen}
        setTrys={setTrys}
        setIsAval={setIsAval}
        setSecNum={setSecNum}
        setOpenSnackbar={setOpenSnackbar}
        handleCheck={handleCheck}
        handleDialogClose={handleDialogClose}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
});
export default ContAdminDialog;
