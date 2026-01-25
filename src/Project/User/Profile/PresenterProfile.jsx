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
  t,
}) {
  const { u, userMoreInfo, accType } = user;

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

  const { setUserMoreInfo, setDeletePopupInfo } = setState;

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
        t={t}
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
          <InfoCards t={t} info={info} />
        </Box>

        {/* ================= FAVORITES ================= */}
        <Box sx={{ mt: 8 }}>
          <FavoriteComp t={t} fav={fav} toggleFavorite={toggleFavorite} />
        </Box>

        {/* ================= PAID ORDERS ================= */}
        {paid && (
          <Box sx={{ mt: 8 }}>
            <PaidOrder
              t={t}
              paid={paid}
              setDeletePopupInfo={setDeletePopupInfo}
              handleClose={handleDeletePopupClose}
              handleDelete={handleDeleteCartOrder}
              handleDeleteItem={handleDeleteItem}
            />
          </Box>
        )}

        {/* ================= LOGOUT  ================= */}
        <LogoutBTNProfile t={t} Link={Link} theme={theme} />
      </Container>

      {/* ================= MODALS & POPUPS ================= */}
      <EditProfile
        t={t}
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        userMoreInfo={userMoreInfo}
        setUserMoreInfo={setUserMoreInfo}
        handleSave={handleSave}
        u={u}
        accType={accType}
      />

      <DeletePopup
        t={t}
        id={deletePopupInfo.id}
        open={deletePopupInfo.open}
        handleClose={deletePopupInfo.handleClose}
        handleDelete={deletePopupInfo.handleDelete}
        msg1={deletePopupInfo.msg1}
        msg2={deletePopupInfo.msg2}
      />
    </Box>
  );
}
