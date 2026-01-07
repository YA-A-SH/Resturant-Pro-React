import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../RTK/MainSlice";
import HomePre from "./PresenterHome";
import { OpenSnackbarContext } from "../Context/MainContext";

export default function ContHome() {
  const [popularMeals, setPopularMeals] = useState([]);
  const location = useLocation();
  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meals, loading, error } = useSelector((state) => state.meals);
  const theme = useTheme();

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  useEffect(() => {
    if (location.state?.loginSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      // setOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

  const isDark = theme.palette.mode === "dark";

  return (
    <HomePre
      loading={loading}
      error={error}
      theme={theme}
      popularMeals={popularMeals}
      toggleFavorite={toggleFavorite}
      isDark={isDark}
      openSnackbar={openSnackbar}
      setOpenSnackbar={setOpenSnackbar}
      navigate={navigate}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
}
