import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDrinks } from "../RTK/MainSlice";
import Base from "./AllComp";

export default function Drinks() {
  const { drinks, loading, error } = useSelector((st) => st.drinks);
  const [preparedDrinks, setPreparedDrinks] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  useEffect(() => {
    if (drinks.length) {
      const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];

      const fixedDrinks = drinks.map((drink) => ({
        id: drink.idDrink,
        title: drink.strDrink,
        image: drink.strDrinkThumb,
        price: Number((Math.random() * 15 + 5).toFixed(2)),
        rate: Number((Math.random() * 2 + 3).toFixed(1)),
        favorite: favFromLS.includes(drink.idDrink),
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreparedDrinks(fixedDrinks);
    }
  }, [drinks]);

  const sortedDrinks = [...preparedDrinks].sort((a, b) =>
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

    setPreparedDrinks((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === id ? { ...meal, favorite: !meal.favorite } : meal
      )
    );
  }

  return (
    <Base
      loading={loading}
      data={sortedDrinks}
      error={error}
      id={"2"}
      msg="Our Drinks"
      body=" Choose your perfect refreshment"
      sortAscending={sortAscending}
      setSortAscending={setSortAscending}
      toggleFavorite={toggleFavorite}
    />
  );
}
