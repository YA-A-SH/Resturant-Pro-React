import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useTranslation } from "react-i18next";

const ContLogin = React.memo(() => {
  const [openReset, setOpenReset] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("Zeus Restaurant | Login");
  }, []);

  return (
    <Login
      openReset={openReset}
      setOpenReset={setOpenReset}
      openAdmin={openAdmin}
      setOpenAdmin={setOpenAdmin}
    />
  );
});
export default ContLogin;
