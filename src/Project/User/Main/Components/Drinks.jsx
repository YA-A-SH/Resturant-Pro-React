import React from "react";
import SweetsAndDrinks from "./Sweets&DrinksBaseComp";

const Drinks = React.memo(() => {
  const type = "drinks";

  return (
    <>
      <SweetsAndDrinks type={type} />
    </>
  );
});
export default Drinks;
