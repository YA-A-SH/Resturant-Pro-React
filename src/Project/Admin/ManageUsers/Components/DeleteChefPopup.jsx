import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  CloseRounded,
  PersonRemoveTwoTone,
  LocalFireDepartmentRounded,
  GppBadRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ChefsContext } from "@else/Components/Context/MainContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DeleteChefPopup({
  open,
  data,
  setOpenDeleteChefPopup,
  isInProfile,
  setIsProfile,
  setSnackbarAlert,
}) {
  const { chefs, setChefs } = useContext(ChefsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dangerColor = "#ff3d00";

  const handleDelete = () => {
    const updatedChefs = chefs.filter((chef) => {
      return chef.id !== data?.id;
    });
    if (isInProfile) {
      navigate(`/admin/manage-users`);
      setIsProfile(false);
      setTimeout(() => {
        setChefs(updatedChefs);
        setOpenDeleteChefPopup(false);
      }, 1000);
    } else {
      setChefs(updatedChefs);
      setOpenDeleteChefPopup(false);
    }
    setSnackbarAlert({
      openSnackbar: true,
      message: t("Chef Fired Done"),
      color: "error",
    });
  };

  const handleClose = () => setOpenDeleteChefPopup(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disablePortal={false}
      PaperProps={{
        sx: {
          borderRadius: "40px",
          overflow: "visible",
          bgcolor: theme.palette.mode === "dark" ? "#1a1a1c" : "#fff",
          backgroundImage: "none",
          maxWidth: "420px",
          width: "95vw",
        },
      }}
    >
      <Box sx={{ p: 5, textAlign: "center", position: "relative" }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            bgcolor: alpha("#000", 0.05),
          }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>

        <Box sx={{ position: "relative", mb: 4 }}>
          <Box
            component={motion.div}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            sx={{
              width: 90,
              height: 90,
              borderRadius: "30px",
              bgcolor: alpha(dangerColor, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              color: dangerColor,
              border: `2px solid ${alpha(dangerColor, 0.2)}`,
            }}
          >
            <PersonRemoveTwoTone sx={{ fontSize: 45 }} />
          </Box>
          <LocalFireDepartmentRounded
            sx={{
              position: "absolute",
              bottom: -10,
              right: "35%",
              fontSize: 30,
              color: dangerColor,
            }}
          />
        </Box>

        <Typography
          variant="h5"
          fontWeight="900"
          sx={{ mb: 1, letterSpacing: -1 }}
        >
          {t("Relieve Chef?")}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, px: 2 }}
        >
          {t("Are you sure you want to remove")}{" "}
          <strong style={{ color: "#000" }}>{data?.name}</strong> from staff?
        </Typography>

        <Stack spacing={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              handleDelete(data.id);
              handleClose();
            }}
            sx={{
              borderRadius: "18px",
              py: 2,
              fontWeight: 900,
              bgcolor: dangerColor,
              boxShadow: `0 15px 30px ${alpha(dangerColor, 0.4)}`,
              "&:hover": { bgcolor: dangerColor, filter: "brightness(1.1)" },
            }}
          >
            {t("Confirm Termination")}
          </Button>

          <Button
            fullWidth
            onClick={handleClose}
            sx={{ fontWeight: 800, color: "text.secondary" }}
          >
            {t("Keep Staff Member")}
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 3, opacity: 0.6 }}
        >
          <GppBadRounded sx={{ fontSize: 16, color: dangerColor }} />
          <Typography variant="caption" fontWeight={700}>
            {t("Admin Authorization Required")}
          </Typography>
        </Stack>
      </Box>
    </Dialog>
  );
}
