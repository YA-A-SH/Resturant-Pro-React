import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSecProfile = React.memo(({ userMoreInfo, handleEditOpen }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDark = theme.palette.mode === "dark";
  const u = JSON.parse(localStorage.getItem("user"));
  const accType =
    u?.providerData?.[0]?.providerId === "google.com"
      ? "Google Account"
      : "Email Account";

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: { xxs: 450, md: 500 },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: -10,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: { xxs: "100%", md: "85%" },
            height: "100%",
            background: isDark
              ? `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.default} 100%)`
              : `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
            borderRadius: { xxs: "0 0 50px 50px", md: "0 0 120px 120px" },
            opacity: isDark ? 0.3 : 0.6,
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ zIndex: 1, pt: 8 }}>
          <Stack alignItems="center" spacing={3}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Avatar
                src={u?.photoURL}
                sx={{
                  width: { xxs: 140, md: 160 },
                  height: { xxs: 140, md: 160 },
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
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 15px 25px ${theme.palette.primary.main}60`,
                },
              }}
            >
              {t("Edit Profile")}
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
});
export default HeroSecProfile;
