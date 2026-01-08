import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

// Components
import EditProfile from "./Components/EditProfile";
import HeroSecProfile from "./Components/HeroSecProfile";
import LogoutBTNProfile from "./Components/LogoutButtonProfile";
import DeletePopup from "./Components/DeletePopup";
import PaidOrder from "./Components/PaidOrders";
import FavoriteComp from "./Components/Favorites";
import InfoCards from "./Components/InfoCard";

export default function PreProfile({
  user,
  handlersAndToggles,
  mealsTypes,
  state,
  setState,
  variables,
}) {
  const { u, userMoreInfo, accType } = user;

  const {
    handleEditOpen,
    handleEditClose,
    handleSave,
    handleDeleteItem,
    handleDeleteCartOrder,
    handleDeleteItemClose,
    handleDeleteOrderClose,
    toggleFavorite,
  } = handlersAndToggles;

  const { fav } = mealsTypes;

  const {
    editOpen,
    paid,
    openDeleteOrderPopup,
    idForItem,
    idForCart,
    openDeleteItemPopup,
  } = state;

  const {
    setUserMoreInfo,
    setOpenDeleteOrderPopup,
    setIdForItem,
    setIdForCart,
    setOpenDeleteItemPopup,
  } = setState;

  const { theme, info, isDark } = variables;

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
        isDark={isDark}
        theme={theme}
        u={u}
        accType={accType}
        userMoreInfo={userMoreInfo}
        handleEditOpen={handleEditOpen}
      />
      {/* ================= CONTENT SECTION ================= */}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* ================= INFO CARDS ================= */}

        <Box sx={{ mt: 5 }}>
          <InfoCards info={info} />
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
              setOpenOrder={setOpenDeleteOrderPopup}
              setOpenItem={setOpenDeleteItemPopup}
              setIdForCart={setIdForCart}
              setIdForItem={setIdForItem}
            />
          </Box>
        )}

        {/* ================= LOGOUT  ================= */}
        <LogoutBTNProfile Link={Link} theme={theme} />
      </Container>

      {/* ================= MODALS & POPUPS ================= */}
      <EditProfile
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        userMoreInfo={userMoreInfo}
        setUserMoreInfo={setUserMoreInfo}
        handleSave={handleSave}
        u={u}
        accType={accType}
      />

      <DeletePopup
        id={idForCart}
        open={openDeleteOrderPopup}
        handleClose={handleDeleteOrderClose}
        handleDelete={handleDeleteCartOrder}
        msg1="Confirm Action"
        msg2="Are you sure you want to delete the order ? This action cannot be undone."
      />
      <DeletePopup
        id={idForItem}
        open={openDeleteItemPopup}
        handleClose={handleDeleteItemClose}
        handleDelete={handleDeleteItem}
        msg1="Confirm Action"
        msg2="Are you sure you want to delete this dish ? This action cannot be undone."
      />
    </Box>
  );
}
