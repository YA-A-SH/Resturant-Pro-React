import PreUsers from "./PreUsers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OpenSnackbarContext } from "@else/Components/Context/MainContext";
import { useTranslation } from "react-i18next";

const ContUsers = React.memo(() => {
  const [openAddChefComp, setOpenAddChefComp] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);

  const { t } = useTranslation();

  const handleCloseSnackbar = useCallback(
    () => setOpenSnackbar(false),
    [setOpenSnackbar],
  );
  useEffect(() => {
    document.title = t("Zeus | Admin => Manage User's");
  }, []);
  return (
    <>
      <PreUsers
        searchText={searchText}
        openAddChefComp={openAddChefComp}
        setOpenAddChefComp={setOpenAddChefComp}
        setSearchText={setSearchText}
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
});
export default ContUsers;
