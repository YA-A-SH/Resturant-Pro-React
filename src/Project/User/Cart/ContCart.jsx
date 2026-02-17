import {
  OpenSnackbarContext,
  ShowCart,
} from "@else/Components/Context/MainContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CartPre from "./PresenterCart";
import { useTranslation } from "react-i18next";

export default function ContCart() {
  // Hooks Use
  const { setShow, cartItems, setCartItems } = useContext(ShowCart);
  const { setOpenSnackbar } = useContext(OpenSnackbarContext);

  const [readyItemsState, setReadyItemsState] = useState([]);

  const { t } = useTranslation();

  // Variables

  const totalPrice = useMemo(() => {
    return (cartItems || []).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

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
      totalPrice={totalPrice}
      onPay={onPay}
      handelClear={handelClear}
      handleClose={handleClose}
    />
  );
}
