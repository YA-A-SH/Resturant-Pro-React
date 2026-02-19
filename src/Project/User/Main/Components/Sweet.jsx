import React from "react";
import SweetsAndDrinks from "./Sweets&DrinksBaseComp";

const Sweets = React.memo(() => {
  const type = "sweets";
  return (
    <>
      <SweetsAndDrinks type={type} />
    </>
  );
});
export default Sweets;
