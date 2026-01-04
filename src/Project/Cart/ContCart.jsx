import { useNavigate } from "react-router-dom";
import CartPre from "./PresenterCart";
import { useContext, useEffect, useState } from "react";
import { ShowCart } from "../Context/MainContext";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function ContCart({ setOpenAlert, setOpenAlert3 }) {
  const navigate = useNavigate();
  const { show, setShow, cartItems, setCartItems } = useContext(ShowCart);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [readyItemsState, setReadyItemsState] = useState([]);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const totalPrice = (cartItems || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    readyItemsState.length === 0
      ? null
      : localStorage.setItem("payedItems", JSON.stringify(readyItemsState));
  }, [readyItemsState]);

  const onDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((e) => (e.id === id ? { ...e, quantity: e.quantity - 1 } : e))
        .filter((e) => e.quantity > 0)
    );
  };

  const onIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((e) => (e.id === id ? { ...e, quantity: e.quantity + 1 } : e))
    );
  };

  function handelClear() {
    setCartItems([]);
    setOpenAlert(true);
  }

  function onPay() {
    const id = uuidv4();

    // const lastPaid = JSON.parse(localStorage.getItem("payedItems"));

    const readyItems = { id: id, cartItems };
    setReadyItemsState([...readyItemsState, readyItems]);

    setCartItems([]);
    setOpenAlert3(true);
    setShow(false);
  }
  return (
    <CartPre
      show={show}
      handleClose={handleClose}
      fullScreen={fullScreen}
      isDark={isDark}
      cartItems={cartItems}
      setShow={setShow}
      navigate={navigate}
      onDecrease={onDecrease}
      onIncrease={onIncrease}
      totalPrice={totalPrice}
      handelClear={handelClear}
      onPay={onPay}
    />
  );
}
