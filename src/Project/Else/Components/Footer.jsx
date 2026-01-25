import { Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { IsAdminContext } from "../../User/Context/MainContext";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { isAdmin } = useContext(IsAdminContext);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        mt: 3,
        py: 2,
        textAlign: "center",
        bgcolor: "background.paper",
        backdropFilter: "blur(10px)",
      }}
    >
      {" "}
      <Typography variant="h6" color="text.secondary">
        {" "}
        {t("footer Text")}{" "}
      </Typography>{" "}
      <Stack direction="row" justifyContent="center" spacing={2} mt={1}>
        {" "}
        <IconButton
          component="a"
          href="https://www.facebook.com/yaser.shkfa"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: isAdmin ? "#7960f3" : "primary.main" }}
        >
          {" "}
          <Facebook />{" "}
        </IconButton>{" "}
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/ya-a-sh-4494743a3"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: isAdmin ? "#7960f3" : "primary.main" }}
        >
          {" "}
          <LinkedIn />{" "}
        </IconButton>{" "}
        <IconButton
          component="a"
          href="https://github.com/YA-A-SH"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: isAdmin ? "#7960f3" : "primary.main" }}
        >
          <GitHub />{" "}
        </IconButton>{" "}
      </Stack>{" "}
    </Box>
  );
}
