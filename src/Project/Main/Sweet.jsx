import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSweets } from "../RTK/MainSlice";
import Base from "./AllComp";
export default function Sweets() {
  const { sweets, loading, error } = useSelector((se) => se.sweet);
  const [preparedSweets, setPreparedSweets] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  useEffect(() => {
    if (sweets.length) {
      const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];

      const fixedSweets = sweets.map((sweet) => ({
        id: sweet.idMeal,
        title: sweet.strMeal,
        image: sweet.strMealThumb,
        price: Number((Math.random() * 15 + 5).toFixed(2)),
        rate: Number((Math.random() * 2 + 3).toFixed(1)),
        favorite: favFromLS.includes(sweet.idMeal),
      }));

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreparedSweets(fixedSweets);
    }
  }, [sweets]);

  const sortedSweets = [...preparedSweets].sort((a, b) =>
    sortAscending ? a.price - b.price : b.price - a.price
  );

  function toggleFavorite(id) {
    const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];
    const isFav = favFromLS.includes(id);

    if (isFav) {
      const newFav = favFromLS.filter((favId) => favId !== id);
      localStorage.setItem("fav", JSON.stringify(newFav));
    } else {
      localStorage.setItem("fav", JSON.stringify([...favFromLS, id]));
    }

    setPreparedSweets((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === id ? { ...meal, favorite: !meal.favorite } : meal
      )
    );
  }

  return (
    <Base
      loading={loading}
      data={sortedSweets}
      error={error}
      id={"1"}
      msg="Our Best Sweets "
      body=" Choose your perfect sweet"
      sortAscending={sortAscending}
      setSortAscending={setSortAscending}
      toggleFavorite={toggleFavorite}
    />
  );
}
