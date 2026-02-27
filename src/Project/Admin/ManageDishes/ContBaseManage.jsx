import BaseManage from "./BaseManage";
import React, { useMemo, useState } from "react";

const ContBaseManage = React.memo(
  ({ type, totalSales, totalCosts, netProfit }) => {
    const [timeFilter, setTimeFilter] = useState("today");

    const mealsSells = useMemo(
      () =>
        timeFilter === "today"
          ? [
              { time: "12PM", sells: 300 },
              { time: "2PM", sells: 520 },
              { time: "4PM", sells: 40 },
              { time: "6PM", sells: 21 },
              { time: "8PM", sells: 12 },
              { time: "10PM", sells: 629 },
            ]
          : timeFilter === "week"
            ? [
                { time: "SA", sells: 1100 },
                { time: "SU", sells: 2100 },
                { time: "MO", sells: 1020 },
                { time: "TU", sells: 2000 },
                { time: "WE", sells: 1620 },
                { time: "TH", sells: 3003 },
                { time: "FR", sells: 700 },
              ]
            : [
                { time: "Week-1", sells: 7500 },
                { time: "Week-2", sells: 10050 },
                { time: "Week-3", sells: 9520 },
                { time: "Week-4", sells: 14000 },
              ],
      [timeFilter],
    );

    const topFiveDishes = useMemo(
      () =>
        timeFilter === "today"
          ? [
              { name: "Big Mac", Dish: 400 },
              { name: "Koshari", Dish: 300 },
              { name: "Cacik", Dish: 500 },
              { name: "Migas", Dish: 300 },
              { name: "Afterglow", Dish: 233 },
            ]
          : timeFilter === "week"
            ? [
                { name: "Big Mac", Dish: 3600 },
                { name: "Koshari", Dish: 2000 },
                { name: "Cacik", Dish: 2600 },
                { name: "Migas", Dish: 1600 },
                { name: "Afterglow", Dish: 1533 },
              ]
            : [
                { name: "Big Mac", Dish: 7000 },
                { name: "Koshari", Dish: 6300 },
                { name: "Cacik", Dish: 8000 },
                { name: "Migas", Dish: 2300 },
                { name: "Afterglow", Dish: 4533 },
              ],
      [timeFilter],
    );
    const drinksSells = useMemo(
      () =>
        timeFilter === "today"
          ? [
              { time: "12PM", sells: 180 },
              { time: "2PM", sells: 260 },
              { time: "4PM", sells: 120 },
              { time: "6PM", sells: 90 },
              { time: "8PM", sells: 210 },
              { time: "10PM", sells: 340 },
            ]
          : timeFilter === "week"
            ? [
                { time: "SA", sells: 950 },
                { time: "SU", sells: 1200 },
                { time: "MO", sells: 880 },
                { time: "TU", sells: 1300 },
                { time: "WE", sells: 1100 },
                { time: "TH", sells: 1600 },
                { time: "FR", sells: 700 },
              ]
            : [
                { time: "Week-1", sells: 4200 },
                { time: "Week-2", sells: 5100 },
                { time: "Week-3", sells: 4800 },
                { time: "Week-4", sells: 6200 },
              ],
      [timeFilter],
    );

    const topFiveDrinks = useMemo(
      () =>
        timeFilter === "today"
          ? [
              { name: "Coca Cola", Dish: 320 },
              { name: "Orange Juice", Dish: 210 },
              { name: "Iced Coffee", Dish: 260 },
              { name: "Lemonade", Dish: 190 },
              { name: "Mineral Water", Dish: 150 },
            ]
          : timeFilter === "week"
            ? [
                { name: "Coca Cola", Dish: 2200 },
                { name: "Orange Juice", Dish: 1700 },
                { name: "Iced Coffee", Dish: 1900 },
                { name: "Lemonade", Dish: 1500 },
                { name: "Mineral Water", Dish: 1200 },
              ]
            : [
                { name: "Coca Cola", Dish: 5200 },
                { name: "Orange Juice", Dish: 4300 },
                { name: "Iced Coffee", Dish: 4800 },
                { name: "Lemonade", Dish: 3600 },
                { name: "Mineral Water", Dish: 3100 },
              ],
      [timeFilter],
    );

    const sweetsSells = useMemo(
      () =>
        timeFilter === "today"
          ? [
              { time: "12PM", sells: 90 },
              { time: "2PM", sells: 140 },
              { time: "4PM", sells: 200 },
              { time: "6PM", sells: 160 },
              { time: "8PM", sells: 230 },
              { time: "10PM", sells: 180 },
            ]
          : timeFilter === "week"
            ? [
                { time: "SA", sells: 600 },
                { time: "SU", sells: 850 },
                { time: "MO", sells: 720 },
                { time: "TU", sells: 900 },
                { time: "WE", sells: 780 },
                { time: "TH", sells: 1100 },
                { time: "FR", sells: 500 },
              ]
            : [
                { time: "Week-1", sells: 2800 },
                { time: "Week-2", sells: 3500 },
                { time: "Week-3", sells: 3300 },
                { time: "Week-4", sells: 4200 },
              ],
      [timeFilter],
    );

    const topFiveSweets = useMemo(
      () =>
        timeFilter === "today"
          ? [
              { name: "Cheesecake", Dish: 180 },
              { name: "Chocolate Cake", Dish: 220 },
              { name: "Donuts", Dish: 200 },
              { name: "Brownies", Dish: 150 },
              { name: "Ice Cream", Dish: 240 },
            ]
          : timeFilter === "week"
            ? [
                { name: "Cheesecake", Dish: 1400 },
                { name: "Chocolate Cake", Dish: 1700 },
                { name: "Donuts", Dish: 1600 },
                { name: "Brownies", Dish: 1100 },
                { name: "Ice Cream", Dish: 1900 },
              ]
            : [
                { name: "Cheesecake", Dish: 3900 },
                { name: "Chocolate Cake", Dish: 4300 },
                { name: "Donuts", Dish: 4100 },
                { name: "Brownies", Dish: 3000 },
                { name: "Ice Cream", Dish: 4800 },
              ],
      [timeFilter],
    );

    const topDish = useMemo(
      () =>
        timeFilter === "today" && type === "meals"
          ? "Cacik"
          : timeFilter === "week" && type === "meals"
            ? "Big Mac"
            : timeFilter === "month" && type === "meals"
              ? "Cacik"
              : timeFilter === "today" && type === "drinks"
                ? "Lemonade"
                : timeFilter === "week" && type === "drinks"
                  ? "Lemonade"
                  : timeFilter === "month" && type === "drinks"
                    ? "Lemonade"
                    : timeFilter === "today" && type === "sweets"
                      ? "Chocolate Cake"
                      : timeFilter === "week" && type === "sweets"
                        ? "Chocolate Cake"
                        : timeFilter === "month" && type === "sweets"
                          ? "Chocolate Cake"
                          : "",
      [timeFilter, type],
    );
    const topDishOrders = useMemo(
      () =>
        timeFilter === "today" && type === "meals"
          ? "500"
          : timeFilter === "week" && type === "meals"
            ? "3600"
            : timeFilter === "month" && type === "meals"
              ? "8000"
              : timeFilter === "today" && type === "drinks"
                ? "1400"
                : timeFilter === "week" && type === "drinks"
                  ? "7800"
                  : timeFilter === "month" && type === "drinks"
                    ? "17800"
                    : timeFilter === "today" && type === "sweets"
                      ? "230"
                      : timeFilter === "week" && type === "sweets"
                        ? "2100"
                        : timeFilter === "month" && type === "sweets"
                          ? "3000"
                          : "0",
      [timeFilter, type],
    );
    const todayOrders = useMemo(
      () =>
        timeFilter === "today" && type === "meals"
          ? "8,400"
          : timeFilter === "week" && type === "meals"
            ? "15,200"
            : timeFilter === "month" && type === "meals"
              ? "27,400"
              : timeFilter === "today" && type === "drinks"
                ? "11,300"
                : timeFilter === "week" && type === "drinks"
                  ? "19,500"
                  : timeFilter === "month" && type === "drinks"
                    ? "34,800"
                    : timeFilter === "today" && type === "sweets"
                      ? "5,600"
                      : timeFilter === "week" && type === "sweets"
                        ? "9,800"
                        : timeFilter === "month" && type === "sweets"
                          ? "17,200"
                          : "0",
      [timeFilter, type],
    );

    return (
      <BaseManage
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        type={type}
        totalSales={totalSales}
        totalCosts={totalCosts}
        netProfit={netProfit}
        mealsSells={mealsSells}
        topFiveDishes={topFiveDishes}
        drinksSells={drinksSells}
        topFiveDrinks={topFiveDrinks}
        sweetsSells={sweetsSells}
        topFiveSweets={topFiveSweets}
        topDish={topDish}
        topDishOrders={topDishOrders}
        todayOrders={todayOrders}
      />
    );
  },
);
export default ContBaseManage;
