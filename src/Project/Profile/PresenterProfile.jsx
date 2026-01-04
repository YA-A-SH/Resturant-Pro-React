import {
  Box,
  Avatar,
  Typography,
  Button,
  Chip,
  Stack,
  Container,
} from "@mui/material";
import { Edit, LogoutRounded } from "@mui/icons-material"; // تأكد من استيراد الأيقونات
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";
import PaidOrder from "./PaidOrders";
import FavoriteComp from "./Favorites";
import InfoCards from "./InfoCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CustomPopup from "./DeletePopup";

export default function PreProfile({
  u,
  fav,
  accType,
  closeNav,
  theme,
  paid,
  idForCart,
  userMoreInfo,
  info,
  isDark,
  editOpen,
  idForItem,
  openDeleteOrderPopup,
  openDeleteItemPopup,

  setOpenDeleteOrderPopup,
  setOpenDeleteItemPopup,
  setIdForItem,
  setIdForCart,
  setUserMoreInfo,

  handleDeleteCartOrder,
  handleEditOpen,
  handleEditClose,
  handleSave,
  handleDeleteItem,
  handleDeleteOrderClose,
  handleDeleteItemClose,
  toggleFavorite,
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        pb: 10,
      }}
    >
      {/* ================= HEADER المطور ================= */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 450, md: 500 },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: -10, // سحب العناصر السفلية للأعلى قليلاً لتداخل جذاب
        }}
      >
        {/* الخلفية المتدرجة المنحنية */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: { xs: "100%", md: "85%" },
            height: "100%",
            background: isDark
              ? `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.default} 100%)`
              : `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
            borderRadius: { xs: "0 0 50px 50px", md: "0 0 120px 120px" },
            opacity: isDark ? 0.3 : 0.6,
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ zIndex: 1, pt: 8 }}>
          <Stack alignItems="center" spacing={3}>
            {/* أنيميشن للأفاتار */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Avatar
                src={u?.photoURL}
                sx={{
                  width: { xs: 140, md: 160 },
                  height: { xs: 140, md: 160 },
                  border: `6px solid ${theme.palette.background.default}`,
                  boxShadow: `0 20px 40px ${theme.palette.primary.main}40`,
                }}
              />
            </motion.div>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                fontWeight="900"
                sx={{ letterSpacing: -1, mb: 1 }}
              >
                {accType === "Google Account"
                  ? u?.displayName
                  : userMoreInfo.name}
              </Typography>

              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                alignItems="center"
              >
                <Chip
                  label={accType}
                  color="primary"
                  variant={isDark ? "outlined" : "filled"}
                  sx={{ fontWeight: "bold", borderRadius: "8px" }}
                />
              </Stack>
            </Box>

            <Button
              startIcon={<Edit />}
              variant="contained"
              onClick={handleEditOpen}
              sx={{
                borderRadius: "15px",
                px: 4,
                py: 1.2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                boxShadow: `0 10px 20px ${theme.palette.primary.main}40`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 15px 25px ${theme.palette.primary.main}60`,
                },
              }}
            >
              Edit Profile
            </Button>
          </Stack>
        </Container>
      </Box>

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

        {/* ================= LOGOUT SECTION ================= */}
        <Box sx={{ mt: 15, textAlign: "center" }}>
          <Button
            component={Link}
            to="/logout"
            variant="outlined"
            color="error"
            onClick={closeNav}
            startIcon={<LogoutRounded />}
            sx={{
              px: 10,
              py: 2,
              borderRadius: "20px",
              fontWeight: "900",
              fontSize: "1.1rem",
              borderWidth: "2px",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                borderWidth: "2px",
                bgcolor: "error.main",
                color: "white",
                boxShadow: `0 10px 30px ${theme.palette.error.main}40`,
              },
            }}
          >
            Log out from account
          </Button>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, opacity: 0.6 }}
          >
            Version 2.0.4 • Secured Profile Data
          </Typography>
        </Box>
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
      <CustomPopup
        id={idForCart}
        open={openDeleteOrderPopup}
        handleClose={handleDeleteOrderClose}
        handleDelete={handleDeleteCartOrder}
        msg1="Confirm Action"
        msg2="Are you sure you want to delete the order ? This action cannot be undone."
      />
      <CustomPopup
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
