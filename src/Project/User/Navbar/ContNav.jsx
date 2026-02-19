import PreNav from "./PresenterNavbar";
import React, { useCallback } from "react";

const ContNav = React.memo(({ showNav, setShowNav }) => {
  const closeNav = useCallback(() => {
    setShowNav(false);
  }, [setShowNav]);

  return (
    <>
      <PreNav showNav={showNav} closeNav={closeNav} />
    </>
  );
});

export default ContNav;
