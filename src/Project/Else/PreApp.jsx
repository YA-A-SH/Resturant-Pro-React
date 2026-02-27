// ************** React ****************

import React, { useCallback, useContext } from "react";

//************* */ MUI ******************

import { Box, Fab } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

// ************** Component ****************

import Head from "@else/Components/Heading";
import ContCart from "@user/Cart/ContCart";
import Footer from "@else/Components/Footer";
import SnackbarComp from "./Components/Else/SnackbarComp";
import RoutesComp from "./Components/Routes/RoutesPage";
import {
  IsAdminContext,
  OpenSnackbarContext,
  ShowCart,
} from "./Components/Context/MainContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@user/RTK/LogSlice";

const PreApp = React.memo(({ handleCloseSnackbar }) => {
  const { isAdmin } = useContext(IsAdminContext);
  const { openSnackbar } = useContext(OpenSnackbarContext);
  const { setShow } = useContext(ShowCart);

  const user = useSelector(selectCurrentUser);

  const disabled = !!user;

  const openShopCart = useCallback(() => setShow(true), [setShow]);
  return (
    <Box component="main">
      {/* //  Heading  */}

      <Head />

      {/* Routes */}
      <RoutesComp />

      {/* Footer */}
      <Footer />

      {/* Else  */}

      <SnackbarComp
        openSnackbar={openSnackbar.open}
        msg={openSnackbar.message}
        color={openSnackbar.color}
        handleClose={handleCloseSnackbar}
      />

      {isAdmin ? null : (
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: disabled ? "" : "none",
            boxShadow: "0 0 20px rgba(255,152,0,0.6)",
          }}
          onClick={openShopCart}
          aria-label="Shopping Cart"
        >
          <ShoppingCart />
        </Fab>
      )}

      <ContCart />
    </Box>
  );
});

export default PreApp;
