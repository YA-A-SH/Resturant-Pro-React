import { ShowCart } from "@else/Components/Context/MainContext";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function IsEmpty() {
  const { setShow } = useContext(ShowCart);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          textAlign: "center",
          gap: 2,
          p: 3,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.light",
            width: 120,
            height: 120,
            fontSize: 60,
          }}
        >
          🛒
        </Avatar>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ animation: "bounce 1.2s infinite" }}
        >
          {t("Your Cart is Empty!")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("desc 6")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => {
            setShow(false);
            navigate("/meals");
          }}
        >
          {t("Go Shopping")}
        </Button>
      </Box>
    </>
  );
}
