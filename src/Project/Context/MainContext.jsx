import { createContext, useState } from "react";

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
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </IsAdminContext.Provider>
  );
};
