import { LogoutRounded } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LogoutBTNProfile = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ mt: 15, textAlign: "center" }}>
        <Button
          component={Link}
          to="/logout"
          variant="outlined"
          color="error"
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
          {t("Log out from account")}
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, opacity: 0.6 }}
        >
          {t("Version 2.0.4 • Secured Profile Data")}
        </Typography>
      </Box>
    </>
  );
});
export default LogoutBTNProfile;
