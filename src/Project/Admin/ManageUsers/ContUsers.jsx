import PreUsers from "./PreUsers";
import React, { useCallback, useContext, useState } from "react";
import { OpenSnackbarContext } from "@else/Components/Context/MainContext";

const ContUsers = React.memo(() => {
  const [openAddChefComp, setOpenAddChefComp] = useState(false);
  const [searchText, setSearchText] = useState("");

  const {  setOpenSnackbar } = useContext(OpenSnackbarContext);


  const handleCloseSnackbar = useCallback(
    () => setOpenSnackbar(false),
    [setOpenSnackbar],
  );
 
  return (
    <>
      <PreUsers
        searchText={searchText}
        openAddChefComp={openAddChefComp}
        setOpenAddChefComp={setOpenAddChefComp}
        setSearchText={setSearchText}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </>
  );
});
export default ContUsers;
