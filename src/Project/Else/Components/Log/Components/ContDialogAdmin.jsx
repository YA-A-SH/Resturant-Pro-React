import { useContext, useState } from "react";
import DialogAdmin from "./DialogAdmin";
import { useNavigate } from "react-router-dom";
import {
  IsAdminContext,
  OpenSnackbarContext,
} from "@else/Components/Context/MainContext";

export default function ContAdminDialog({ open, setOpen, t }) {
  const [secNum, setSecNum] = useState("");
  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);

  const [trys, setTrys] = useState(3);
  const [isAval, setIsAval] = useState(false);
  const secreteNumber = "770304";
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(IsAdminContext);

  const handleDialogClose = () => {
    setOpen(false);
    setSecNum("");
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar({ ...openSnackbar, openSnackbar: false });
  };
  const handleCheck = () => {
    if (secNum === secreteNumber) {
      navigate("/admin");
      setIsAdmin(true);
      localStorage.setItem("isAdmin", true);
    } else {
      setOpenSnackbar(true);
    }
    setTrys(trys - 1);
  };
  return (
    <>
      <DialogAdmin
        trys={trys}
        open={open}
        setOpen={setOpen}
        secNum={secNum}
        setTrys={setTrys}
        setIsAval={setIsAval}
        handleDialogClose={handleDialogClose}
        handleSnackbarClose={handleSnackbarClose}
        setSecNum={setSecNum}
        isAval={isAval}
        handleCheck={handleCheck}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        t={t}
      />
    </>
  );
}
