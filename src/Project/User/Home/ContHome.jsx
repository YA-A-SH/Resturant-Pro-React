// Hooks
import React, { useCallback, useContext, useEffect, useState } from "react";

//Lib

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Comp
import { fetchMeals, mealsDataSelector, mealsErrorSelector, mealsLoadingSelector } from "../RTK/Dishe'sSlice";
import HomePre from "./PresenterHome";
import { useTranslation } from "react-i18next";
import { OpenSnackbarContext } from "@else/Components/Context/MainContext";

const ContHome = React.memo(() => {
  // Hooks Use
  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);
  const meals = useSelector(mealsDataSelector);
  const loading = useSelector(mealsLoadingSelector);
  const error = useSelector(mealsErrorSelector);

  const [popularMeals, setPopularMeals] = useState([]);
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  // Effects

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setOpenSnackbar({
        openSnackbar: true,
        message: t("login"),
        color: "success",
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state, setOpenSnackbar, t]);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    if (meals.length) {
      const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];

      const fixedMeals = [...meals]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
        .map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          price: Number((Math.random() * 15 + 5).toFixed(2)),
          rate: Number((Math.random() * 2 + 3).toFixed(1)),
          favorite: favFromLS.includes(meal.idMeal),
        }));

      setPopularMeals(fixedMeals);
    }
  }, [meals]);

  useEffect(() => {
    document.title = t("title");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseSnackbar = useCallback(
    (reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSnackbar({ openSnackbar: false, message: "", color: "" });
    },
    [setOpenSnackbar],
  );

  // Variables

  return (
    <HomePre
      loading={loading}
      error={error}
      popularMeals={popularMeals}
      handleCloseSnackbar={handleCloseSnackbar}
      setPopularMeals={setPopularMeals}
      openSnackbar={openSnackbar}
      setOpenSnackbar={setOpenSnackbar}
    />
  );
});
export default ContHome;
