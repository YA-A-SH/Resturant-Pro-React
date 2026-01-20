import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react-refresh/only-export-components
export const User = createContext({
  user: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const ShowCart = createContext();

export const ShowCartProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.log(e);
      return [];
    }
  });
  return (
    <ShowCart.Provider value={{ show, setShow, cartItems, setCartItems }}>
      {children}
    </ShowCart.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const OpenSnackbarContext = createContext();

export const OpenSnackbarProvider = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  return (
    <OpenSnackbarContext.Provider value={{ openSnackbar, setOpenSnackbar }}>
      {children}
    </OpenSnackbarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favoriteFood, setFavoriteFood] = useState(() => {
    const savedFav = localStorage.getItem("favorite");
    return savedFav ? JSON.parse(savedFav) : [];
  });
  return (
    <FavContext.Provider value={{ favoriteFood, setFavoriteFood }}>
      {children}
    </FavContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const IsAdminContext = createContext();

export const IsAdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    () => JSON.parse(localStorage.getItem("isAdmin")) || false,
  );

  return (
    <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </IsAdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const ChefsContext = createContext();

export const ChefsProvider = ({ children }) => {
  const [chefs, setChefs] = useState(
    () =>
      JSON.parse(localStorage.getItem("chefs")) || [
        {
          id: uuidv4(),
          name: "Ramos",
          role: "Head Chef",
          salary: "5200",
          city: "Spain",
          mail: "ramosMail@gmail.com",
          img: "https://randomuser.me/api/portraits/men/21.jpg",
          rate: [
            { month: "Jan", rate: 8.9 },
            { month: "Feb", rate: 9.6 },
            { month: "Mar", rate: 9.1 },
          ],
        },
        {
          id: uuidv4(),
          name: "Sara",
          role: "Pastry Chef",
          salary: "4100",
          city: "London",
          mail: "saraMail@gmail.com",
          img: "https://randomuser.me/api/portraits/women/8.jpg",
          rate: [
            { month: "Jan", rate: 9 },
            { month: "Feb", rate: 9 },
            { month: "Mar", rate: 9.2 },
          ],
        },
        {
          id: uuidv4(),
          name: "Ali",
          role: "Sous Chef",
          salary: "3400",
          city: "Rafah",
          mail: "aliMail@gmail.com",
          img: "https://randomuser.me/api/portraits/men/4.jpg",
          rate: [
            { month: "Jan", rate: 7.4 },
            { month: "Feb", rate: 7.9 },
            { month: "Mar", rate: 8.1 },
          ],
        },
      ],
  );

  return (
    <ChefsContext.Provider value={{ chefs, setChefs }}>
      {children}
    </ChefsContext.Provider>
  );
};
