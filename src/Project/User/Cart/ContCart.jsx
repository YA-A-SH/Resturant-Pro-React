// Contexts

import {
  OpenSnackbarContext,
  ShowCart,
} from "@else/Components/Context/MainContext";

//Hooks

import { useCallback, useContext, useEffect, useState } from "react";

// Lib

import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

//Components

import CartPre from "./PresenterCart";
import { useTranslation } from "react-i18next";

export default function ContCart() {
  // Hooks Use
  const { setOpenSnackbar } = useContext(OpenSnackbarContext);

  const { show, setShow, cartItems, setCartItems } = useContext(ShowCart);
  const [readyItemsState, setReadyItemsState] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const theme = useTheme();

  // Variables

  const isDark = theme.palette.mode === "dark";
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const totalPrice = (cartItems || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
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

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const onDecrease = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev
          .map((e) => (e.id === id ? { ...e, quantity: e.quantity - 1 } : e))
          .filter((e) => e.quantity > 0),
      );
    },
    [setCartItems],
  );

  const onIncrease = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev.map((e) => (e.id === id ? { ...e, quantity: e.quantity + 1 } : e)),
      );
    },
    [setCartItems],
  );

  const handelClear = useCallback(() => {
    setCartItems([]);
    setOpenSnackbar({
      open: true,
      message: t("Cart Cleared Successfully"),
      color: "error",
    });
  }, [setCartItems, setOpenSnackbar, t]);

  const onPay = useCallback(() => {
    const id = uuidv4();
    setReadyItemsState((prev) => [...prev, { id, cartItems }]);
    setCartItems([]);
    setShow(false);
    setOpenSnackbar({
      open: true,
      message: t("Item's Added Successfully"),
      color: "success",
    });
  }, [cartItems, setCartItems, setOpenSnackbar, setShow, t]);

  // UI

  return (
    <CartPre
      show={show}
      fullScreen={fullScreen}
      totalPrice={totalPrice}
      navigate={navigate}
      isDark={isDark}
      cartItems={cartItems}
      setShow={setShow}
      onDecrease={onDecrease}
      onIncrease={onIncrease}
      onPay={onPay}
      handelClear={handelClear}
      handleClose={handleClose}
      t={t}
    />
  );
}
