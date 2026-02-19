import { Box, Container } from "@mui/material";

// Components
import EditProfile from "./Components/EditProfile";
import HeroSecProfile from "./Components/HeroSecProfile";
import LogoutBTNProfile from "./Components/LogoutButtonProfile";
import DeletePopup from "./Components/DeletePopup";
import PaidOrder from "./Components/PaidOrders";
import FavoriteComp from "./Components/Favorites";
import InfoCards from "./Components/InfoCard";
import React from "react";

const PreProfile = React.memo(
  ({
    userMoreInfo,
    handlersAndToggles,
    mealsTypes,
    state,
    setUserMoreInfo,
    setDeletePopupInfo,
  }) => {
    const {
      handleEditOpen,
      handleEditClose,
      handleSave,
      handleDeleteItem,
      handleDeleteCartOrder,
      handleDeletePopupClose,
      toggleFavorite,
    } = handlersAndToggles;

    const { fav } = mealsTypes;

    const { editOpen, paid, deletePopupInfo } = state;

    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          pb: 10,
        }}
      >
        {/* ================= HEADER  ================= */}
        <HeroSecProfile
          userMoreInfo={userMoreInfo}
          handleEditOpen={handleEditOpen}
        />
        {/* ================= CONTENT SECTION ================= */}

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* ================= INFO CARDS ================= */}

          <Box sx={{ mt: 5 }}>
            <InfoCards userMoreInfo={userMoreInfo} />
          </Box>

          {/* ================= FAVORITES ================= */}
          <Box sx={{ mt: 8 }}>
            <FavoriteComp fav={fav} toggleFavorite={toggleFavorite} />
          </Box>

          {/* ================= PAID ORDERS ================= */}
          {paid && (
            <Box sx={{ mt: 8 }}>
              <PaidOrder
                paid={paid}
                setDeletePopupInfo={setDeletePopupInfo}
                handleClose={handleDeletePopupClose}
                handleDelete={handleDeleteCartOrder}
                handleDeleteItem={handleDeleteItem}
              />
            </Box>
          )}

          {/* ================= LOGOUT  ================= */}
          <LogoutBTNProfile />
        </Container>

        {/* ================= MODALS & POPUPS ================= */}
        <EditProfile
          editOpen={editOpen}
          handleEditClose={handleEditClose}
          userMoreInfo={userMoreInfo}
          setUserMoreInfo={setUserMoreInfo}
          handleSave={handleSave}
        />

        <DeletePopup
          id={deletePopupInfo.id}
          open={deletePopupInfo.open}
          handleClose={deletePopupInfo.handleClose}
          handleDelete={deletePopupInfo.handleDelete}
          msg1={deletePopupInfo.msg1}
          msg2={deletePopupInfo.msg2}
        />
      </Box>
    );
  },
);
export default PreProfile;
