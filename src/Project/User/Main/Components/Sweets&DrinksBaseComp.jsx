import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { fetchDrinks, fetchSweets } from "../../RTK/Dishe'sSlice";
import Base from "../AllComp";
import { useTranslation } from "react-i18next";
import {
  drinksDataSelector,
  drinksErrorSelector,
  drinksLoadingSelector,
  sweetsDataSelector,
  sweetsErrorSelector,
  sweetsLoadingSelector,
} from "@user/RTK/Dishe'sSlice";

const SweetsAndDrinks = React.memo(({ type }) => {
  const meals = useSelector(
    type === "drinks" ? drinksDataSelector : sweetsDataSelector,
  );
  const loading = useSelector(
    type === "drinks" ? drinksLoadingSelector : sweetsLoadingSelector,
  );
  const error = useSelector(
    type === "drinks" ? drinksErrorSelector : sweetsErrorSelector,
  );

  const [preparedMeals, setPreparedMeals] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    type === "drinks"
      ? (document.title = t("Zeus Restaurant | Drinks"))
      : (document.title = t("Zeus Restaurant | Sweets"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    const fetchType = type === "drinks" ? fetchDrinks : fetchSweets;
    dispatch(fetchType());
  }, [dispatch, type]);

  useEffect(() => {
    if (meals.length) {
      const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];

      const fixedMeals = meals.map((meal) => ({
        id: type === "drinks" ? meal.idDrink : meal.idMeal,
        title: type === "drinks" ? meal.strDrink : meal.strMeal,
        image: type === "drinks" ? meal.strDrinkThumb : meal.strMealThumb,
        price: Number((Math.random() * 15 + 5).toFixed(2)),
        rate: Number((Math.random() * 2 + 3).toFixed(1)),
        favorite:
          type === "drinks"
            ? favFromLS.includes(meal.idDrink)
            : favFromLS.includes(meal.idMeal),
      }));

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreparedMeals(fixedMeals);
    }
  }, [meals, type]);

  const sortedMeals = useMemo(() => {
    return [...preparedMeals].sort((a, b) =>
      sortAscending ? a.price - b.price : b.price - a.price,
    );
  }, [preparedMeals, sortAscending]);
  return (
    <Base
      loading={loading}
      data={sortedMeals}
      error={error}
      id={type}
      msg={type === "drinks" ? t("Our Drinks") : t("Our Best Sweets")}
      body={
        type === "drinks"
          ? t(" Choose your perfect refreshment")
          : t(" Choose your perfect sweet")
      }
      sortAscending={sortAscending}
      setSortAscending={setSortAscending}
      setPopularMeals={setPreparedMeals}
    />
  );
});
export default SweetsAndDrinks;
