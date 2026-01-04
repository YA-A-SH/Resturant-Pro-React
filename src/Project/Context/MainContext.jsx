import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ShowContext = createContext();

export const ShowContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("");
  return (
    <ShowContext.Provider value={{ show, setShow, color, setColor }}>
      {children}
    </ShowContext.Provider>
  );
};

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
export const OpenAlert = createContext();

export const OpenAlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <OpenAlert.Provider value={{ open, setOpen }}>
      {children}
    </OpenAlert.Provider>
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
export const IsAdminContext = createContext({
  isAdmin: false,
  setIsAdmin: () => {},
});
