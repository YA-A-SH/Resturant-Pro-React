import { useTheme } from "@emotion/react";
import { ShowContext } from "../Context/MainContext";
import PreProfile from "./PresenterProfile";
import { useContext, useEffect, useState } from "react";
import {
  CalendarToday,
  Email,
  LocationOn,
  Phone,
  Receipt,
} from "@mui/icons-material";

export default function ContProfile() {
  const [idForItem, setIdForItem] = useState("");
  const [idForCart, setIdForCart] = useState("");
  const theme = useTheme();
  const [openDeleteOrderPopup, setOpenDeleteOrderPopup] = useState(false);
  const [openDeleteItemPopup, setOpenDeleteItemPopup] = useState(false);

  const { setShow, setCartItems } = useContext(ShowContext);
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

  const closeNav = () => setShow(false);

  function handleDeleteItem(id) {
    setPaid((prev) => {
      const updated = prev
        .map((order) =>
          order.id === idForCart
            ? {
                ...order,
                cartItems: order.cartItems.filter((item) => item.id !== id),
              }
            : order
        )
        .filter((order) => order.cartItems.length > 0);

      return updated;
    });
  }

  function handleDeleteCartOrder(id) {
    setPaid((prev) => {
      const updated = prev.filter((order) => order.id !== id);
      return updated;
    });
  }


  function handleDeleteOrderClose() {
    setOpenDeleteOrderPopup(false);
  }
  function handleDeleteItemClose() {
    setOpenDeleteItemPopup(false);
  }
  // ================== RENDER ==================

  return (
    <PreProfile
      u={u}
      accType={accType}
      userMoreInfo={userMoreInfo}
      handleEditOpen={handleEditOpen}
      fav={favMeals}
      toggleFavorite={toggleFavorite}
      editOpen={editOpen}
      handleEditClose={handleEditClose}
      handleSave={handleSave}
      setUserMoreInfo={setUserMoreInfo}
      closeNav={closeNav}
      theme={theme}
      paid={paid}
      handleDeleteItem={handleDeleteItem}
      info={info}
      isDark={isDark}
      openDeleteOrderPopup={openDeleteOrderPopup}
      setOpenDeleteOrderPopup={setOpenDeleteOrderPopup}
      idForItem={idForItem}
      setIdForItem={setIdForItem}
      setIdForCart={setIdForCart}
      handleDeleteCartOrder={handleDeleteCartOrder}
      idForCart={idForCart}
      handleDeleteOrderClose={handleDeleteOrderClose}
      handleDeleteItemClose={handleDeleteItemClose}
      openDeleteItemPopup={openDeleteItemPopup}
      setOpenDeleteItemPopup={setOpenDeleteItemPopup}
    />
  );
}
