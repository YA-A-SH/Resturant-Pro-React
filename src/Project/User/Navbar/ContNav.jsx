import PreNav from "./PresenterNavbar";
import { useTheme } from "@mui/material";
import React, { useCallback } from "react";

const ContNav = React.memo(({ showNav, setShowNav }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const closeNav = useCallback(() => {
    setShowNav(false);
  }, [setShowNav]);

  return (
    <>
      <PreNav
        showNav={showNav}
        closeNav={closeNav}
        isDark={isDark}
      />
    </>
  );
});

export default ContNav;
