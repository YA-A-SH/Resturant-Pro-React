import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDrinks, fetchSweets } from "../../RTK/MainSlice";
import Base from "../AllComp";
import { useTranslation } from "react-i18next";

export default function SweetsAndDrinks({ type }) {
  const { meals, loading, error } = useSelector((st) =>
    type === "drinks" ? st.drinks : st.sweet,
  );
  const [preparedMeals, setPreparedMeals] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    type === "drinks"
      ? (document.title = t("Zeus Restaurant | Drinks"))
      : (document.title = t("Zeus Restaurant | Sweets"));
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

  const sortedMeals = [...preparedMeals].sort((a, b) =>
    sortAscending ? a.price - b.price : b.price - a.price,
  );

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
}
