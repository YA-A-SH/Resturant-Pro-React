import AboutUs from "./PresenterAboutUs";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const ContAboutUs = React.memo(() => {
  const { t } = useTranslation();

  const stats = useMemo(
    () => [
      { number: "50000+", label: t("Happy Customers") },
      { number: "120k+", label: t("Orders") },
      { number: "10+", label: t("Years Experience") },
      { number: "24/7", label: t("Support"), static: true },
    ],
    [t],
  );

  useEffect(() => {
    document.title = t("Zeus Restaurant | About Us");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AboutUs stats={stats} />;
});
export default ContAboutUs;
