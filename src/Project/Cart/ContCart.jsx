// Contexts

import { ShowCart } from "../Context/MainContext";

//Hooks

import { useContext, useEffect, useState } from "react";

// Lib

import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

//Components

import CartPre from "./PresenterCart";

export default function ContCart({ setSnackbar }) {
  // Hooks Use

  const { show, setShow, cartItems, setCartItems } = useContext(ShowCart);
  const [readyItemsState, setReadyItemsState] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  // Variables

  const isDark = theme.palette.mode === "dark";
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const totalPrice = (cartItems || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Effect

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    readyItemsState.length === 0
      ? null
      : localStorage.setItem("payedItems", JSON.stringify(readyItemsState));
  }, [readyItemsState]);

  // Functions

  const handleClose = () => {
    setShow(false);
  };

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
    setSnackbar({
      open: true,
      message: "Cart Cleared Successfully",
      color: "error",
    });
  }

  function onPay() {
    const id = uuidv4();
    const readyItems = { id: id, cartItems };
    setReadyItemsState([...readyItemsState, readyItems]);
    setCartItems([]);
    setShow(false);
    setSnackbar({
      open: true,
      message: "Item's Added Successfully",
      color: "success",
    });
  }

  // UI
  
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
