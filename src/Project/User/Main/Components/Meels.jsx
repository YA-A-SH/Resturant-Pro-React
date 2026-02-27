import { useEffect, useState } from "react";
import { fetchMeals } from "../../RTK/Dishe'sSlice";
import { useDispatch, useSelector } from "react-redux";
import Base from "../AllComp";
import { useTranslation } from "react-i18next";
import {
  mealsDataSelector,
  mealsErrorSelector,
  mealsLoadingSelector,
} from "@user/RTK/Dishe'sSlice";

function getMealType(category) {
  if (category === "Breakfast" || category === "Side" || category === "Starter")
    return "Breakfast";
  if (["Chicken", "Seafood"].includes(category)) return "Lunch";
  if (["Beef", "Pasta", "Lamb", "Dessert"].includes(category)) return "Dinner";
  return "Lunch";
}

export default function Meals() {
  const [selectedType, setSelectedType] = useState("Breakfast");
  const meals = useSelector(mealsDataSelector);
  const loading = useSelector(mealsLoadingSelector);
  const error = useSelector(mealsErrorSelector);
  const [preparedMeals, setPreparedMeals] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    if (meals.length) {
      const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];
      const fixedMeals = meals.map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        price: Number((Math.random() * 15 + 5).toFixed(2)),
        rate: Number((Math.random() * 2 + 3).toFixed(1)),
        type: getMealType(meal.strCategory),
        favorite: favFromLS.includes(meal.idMeal),
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreparedMeals(fixedMeals);
    }
  }, [meals]);

  useEffect(() => {
    document.title = t("Zeus Restaurant | Meals");
  }, []);

  const filteredMeals = preparedMeals.filter(
    (meal) => meal.type === selectedType,
  );

  const sortedMeals = [...filteredMeals].sort((a, b) =>
    sortAscending ? a.price - b.price : b.price - a.price,
  );

  return (
    <>
      <Base
        loading={loading}
        data={sortedMeals}
        error={error}
        id={"3"}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        sortAscending={sortAscending}
        setSortAscending={setSortAscending}
        setPopularMeals={setPreparedMeals}
      />
    </>
  );
}
