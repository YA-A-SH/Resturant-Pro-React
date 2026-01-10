import { useTheme } from "@emotion/react";
import PreProfile from "./PresenterProfile";
import { useEffect, useState } from "react";
import {
  CalendarToday,
  Email,
  LocationOn,
  Phone,
  Receipt,
} from "@mui/icons-material";

export default function ContProfile() {
  const [deletePopupInfo, setDeletePopupInfo] = useState({
    id: "",
    open: "",
    handleClose: "",
    handleDelete: "",
    msg1: "",
    msg2: "",
  });

  const theme = useTheme();
  const [paid, setPaid] = useState(() => {
    const saved = localStorage.getItem("payedItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("payedItems", JSON.stringify(paid));
  }, [paid]);

  const [editOpen, setEditOpen] = useState(false);
  const [favMeals, setFavMeals] = useState([]);
  const [userMoreInfo, setUserMoreInfo] = useState({
    phone: "No Phone Provided",
    address: "No Address Provided",
    mail: "No Email Provided",
    name: "User",
  });

  // Variables

  const u = JSON.parse(localStorage.getItem("user"));

  const isDark = theme.palette.mode === "dark";

  const accType =
    u?.providerData?.[0]?.providerId === "google.com"
      ? "Google Account"
      : "Email Account";

  // ================== FAVORITES ==================
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

    document.title = "Zeus Restaurant | Profile";
  }, []);

  // ================== USER INFO ==================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userMoreInfo"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setUserMoreInfo(saved);
  }, []);

  const info = [
    { icon: <Phone />, label: "Phone", value: userMoreInfo.phone },
    {
      icon: <LocationOn />,
      label: "Address",
      value: userMoreInfo.address,
    },
    {
      icon: <CalendarToday />,
      label: "Joined On",
      value: new Date(1766304856103).toDateString(),
    },
    {
      icon: <Receipt />,
      label: "Last Login",
      value: new Date(Number(u?.lastLoginAt)).toLocaleString(),
    },
    {
      icon: <Email />,
      label: "Email",
      value: accType === "Email Account" ? u?.email : userMoreInfo.mail,
    },
  ];

  // ================== FUNCTIONS ==================

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleSave = () => {
    localStorage.setItem("userMoreInfo", JSON.stringify(userMoreInfo));
    setEditOpen(false);
  };

  function toggleFavorite(id) {
    const favFromLS = JSON.parse(localStorage.getItem("fav")) || [];
    const isFav = favFromLS.includes(id);

    const updatedFav = isFav
      ? favFromLS.filter((favId) => favId !== id)
      : [...favFromLS, id];

    localStorage.setItem("fav", JSON.stringify(updatedFav));

    setFavMeals((prev) =>
      isFav ? prev.filter((item) => item.id !== id) : prev
    );
  }

  function handleDeleteItem(cartId, itemId) {
    setPaid((prev) =>
      prev
        .map((order) =>
          order.id === cartId
            ? {
                ...order,
                cartItems: order.cartItems.filter((item) => item.id !== itemId),
              }
            : order
        )
        .filter((order) => order.cartItems.length > 0)
    );
  }

  function handleDeleteCartOrder(id) {
    setPaid((prev) => {
      const updated = prev.filter((order) => order.id !== id);
      return updated;
    });
  }

  function handleDeletePopupClose() {
    setDeletePopupInfo({ ...deletePopupInfo, open: false });
  }

  // ================== Obj For Props  ==================

  const user = {
    u: u,
    userMoreInfo: userMoreInfo,
    accType: accType,
  };

  const handlersAndToggles = {
    handleEditOpen: handleEditOpen,
    handleEditClose: handleEditClose,
    handleSave: handleSave,
    handleDeleteItem: handleDeleteItem,
    handleDeleteCartOrder: handleDeleteCartOrder,
    handleDeletePopupClose: handleDeletePopupClose,
    toggleFavorite: toggleFavorite,
  };

  const mealsTypes = {
    fav: favMeals,
  };

  const state = {
    editOpen: editOpen,
    paid: paid,
    deletePopupInfo: deletePopupInfo,
  };

  const setState = {
    setUserMoreInfo: setUserMoreInfo,
    setDeletePopupInfo: setDeletePopupInfo,
  };

  const variables = {
    theme: theme,
    info: info,
    isDark: isDark,
  };
  // ================== RENDER ==================

  return (
    <PreProfile
      user={user}
      handlersAndToggles={handlersAndToggles}
      mealsTypes={mealsTypes}
      state={state}
      setState={setState}
      variables={variables}
    />
  );
}
