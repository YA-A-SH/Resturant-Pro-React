import PreProfile from "./PresenterProfile";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const ContProfile = React.memo(() => {
  // Hooks Use
  const { t } = useTranslation();

  const [deletePopupInfo, setDeletePopupInfo] = useState({
    id: "",
    open: "",
    handleClose: "",
    handleDelete: "",
    msg1: "",
    msg2: "",
  });
  const [paid, setPaid] = useState(() => {
    const saved = localStorage.getItem("payedItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [editOpen, setEditOpen] = useState(false);
  const [favMeals, setFavMeals] = useState([]);
  const [userMoreInfo, setUserMoreInfo] = useState({
    phone: t("No Phone Provided"),
    address: t("No Address Provided"),
    mail: t("No Email Provided"),
    name: t("User"),
  });

  //  Side Effects
  useEffect(() => {
    localStorage.setItem("payedItems", JSON.stringify(paid));
  }, [paid]);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("fav")) || [];
    const meals = JSON.parse(localStorage.getItem("meals")) || [];
    const sweets = JSON.parse(localStorage.getItem("sweets")) || [];
    const drinks = JSON.parse(localStorage.getItem("drinks")) || [];

    const allData = [...meals, ...sweets, ...drinks];

    const readyFav = allData
      .filter((item) => favIds.includes(item.idMeal || item.idDrink))
      .map((item) => ({
        id: item.idMeal || item.idDrink,
        title: item.strMeal || item.strDrink,
        image: item.strMealThumb || item.strDrinkThumb,
      }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavMeals(readyFav);

    document.title = t("Zeus Restaurant | Profile");
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userMoreInfo"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setUserMoreInfo(saved);
  }, []);

  // ================== FUNCTIONS ==================

  const handleEditOpen = useCallback(() => setEditOpen(true), []);

  const handleEditClose = useCallback(() => setEditOpen(false), []);

  const handleSave = useCallback(() => {
    localStorage.setItem("userMoreInfo", JSON.stringify(userMoreInfo));
    setEditOpen(false);
  }, [userMoreInfo]);

  const toggleFavorite = useCallback((id) => {
    const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];
    const isFav = favFromLS.includes(id);

    const updatedFav = isFav
      ? favFromLS.filter((favId) => favId !== id)
      : [...favFromLS, id];

    localStorage.setItem("fav", JSON.stringify(updatedFav));

    setFavMeals((prev) =>
      isFav ? prev.filter((item) => item.id !== id) : prev,
    );
  }, []);

  const handleDeleteItem = useCallback((cartId, itemId) => {
    setPaid((prev) =>
      prev
        .map((order) =>
          order.id === cartId
            ? {
                ...order,
                cartItems: order.cartItems.filter((item) => item.id !== itemId),
              }
            : order,
        )
        .filter((order) => order.cartItems.length > 0),
    );
  }, []);

  const handleDeleteCartOrder = useCallback((id) => {
    setPaid((prev) => {
      const updated = prev.filter((order) => order.id !== id);
      return updated;
    });
  }, []);

  const handleDeletePopupClose = useCallback(() => {
    setDeletePopupInfo({ ...deletePopupInfo, open: false });
  }, [deletePopupInfo]);
  // ================== Obj For Props  ==================

  const handlersAndToggles = useMemo(
    () => ({
      handleEditOpen,
      handleEditClose,
      handleSave,
      handleDeleteItem,
      handleDeleteCartOrder,
      handleDeletePopupClose,
      toggleFavorite,
    }),
    [
      handleEditOpen,
      handleEditClose,
      handleSave,
      handleDeleteItem,
      handleDeleteCartOrder,
      handleDeletePopupClose,
      toggleFavorite,
    ],
  );

  const mealsTypes = useMemo(
    () => ({
      fav: favMeals,
    }),
    [favMeals],
  );

  const state = useMemo(
    () => ({
      editOpen: editOpen,
      paid: paid,
      deletePopupInfo: deletePopupInfo,
    }),
    [editOpen, paid, deletePopupInfo],
  );

  // ================== RENDER ==================

  return (
    <PreProfile
      userMoreInfo={userMoreInfo}
      handlersAndToggles={handlersAndToggles}
      mealsTypes={mealsTypes}
      state={state}
      setUserMoreInfo={setUserMoreInfo}
      setDeletePopupInfo={setDeletePopupInfo}
    />
  );
});
export default ContProfile;
