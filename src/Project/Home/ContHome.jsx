// Hooks
import { useEffect, useState } from "react";

//Lib

import { useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Comp
import { fetchMeals } from "../RTK/MainSlice";
import HomePre from "./PresenterHome";

export default function ContHome() {
  // Hooks Use
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    color: "",
  });
  const { meals, loading, error } = useSelector((state) => state.meals);
  const [popularMeals, setPopularMeals] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();

  // Effects

  useEffect(() => {
    if (location.state?.loginSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSnackbar({
        open: true,
        msg: "Login successful 👋",
        color: "success",
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.state, setSnackbar]);

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

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPopularMeals(fixedMeals);
    }
  }, [meals]);

  // Functions

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ open: false, msg: "", color: "" });
  };

  function toggleFavorite(id) {
    const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];
    const isFav = favFromLS.includes(id);

    if (isFav) {
      const newFav = favFromLS.filter((favId) => favId !== id);
      localStorage.setItem("fav", JSON.stringify(newFav));
    } else {
      localStorage.setItem("fav", JSON.stringify([...favFromLS, id]));
    }

    setPopularMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === id ? { ...meal, favorite: !meal.favorite } : meal
      )
    );
  }

  // Variables

  const isDark = theme.palette.mode === "dark";

  return (
    <HomePre
      loading={loading}
      error={error}
      popularMeals={popularMeals}
      toggleFavorite={toggleFavorite}
      isDark={isDark}
      snackbar={snackbar}
      setSnackbar={setSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
}
