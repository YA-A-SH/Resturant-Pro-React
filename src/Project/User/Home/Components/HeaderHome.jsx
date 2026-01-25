import { ArrowForward, LocalMall } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HeaderHome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xxs: "column", md: "row-reverse" },
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: { xxs: "center", md: "left" },
          width: "100%",
          gap: { xxs: 5, md: 15, lg: 25, xl: 35 },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* --- Head Title--- */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: { xxs: "center", md: "flex-start" },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              letterSpacing: { xs: 1, md: 3 },
              fontSize: {
                xxs: "0.7rem",
                sm: "0.8rem",
                md: "0.9rem",
                lg: "1rem",
              },
            }}
          >
            {t("head Title")}
          </Typography>

          <Typography
            variant="h1"
            sx={{
              p: 2,
              fontSize: {
                xxs: "2.2rem",
                sm: "2.7rem",
                md: "3.2rem",
                lg: "4.1rem",
              },
              fontWeight: 900,
              lineHeight: 1,
              mt: 1,
              background: isDark
                ? "linear-gradient(to right, #fff, #A1A1A6)"
                : "linear-gradient(to right, #1d1d1f, #434343)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("Experience Real")} <br />
            <Box
              component="span"
              sx={{
                color: "primary.main",
                WebkitTextFillColor: "initial",
              }}
            >
              {t("Taste")}
            </Box>{" "}
            {t("in Gaza")}
          </Typography>

          {/* --- Description --- */}
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: { xxs: "90%", md: 550 },
              lineHeight: 1.7,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              fontWeight: 400,
            }}
          >
            {t("desc 1")}
          </Typography>

          {/* --- Buttons --- */}
          <Stack
            direction={{ xxs: "column", sm: "row" }}
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<LocalMall />}
              sx={{
                width: { xxs: "100%", sm: "200px", md: "auto" },
                borderRadius: 3,
                px: { xxs: 2, md: 5 },
                py: 1.8,
                fontSize: { xs: "0.9rem", md: "1rem" },
                textTransform: "none",
                boxShadow: "0 10px 20px -5px rgba(255, 87, 34, 0.3)",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate("/meals")}
            >
              {t("Order Now")}
            </Button>

            <Button
              variant="outlined"
              size="large"
              color="primary"
              endIcon={<ArrowForward />}
              sx={{
                width: { xxs: "100%", sm: "200px", md: "auto" },
                borderRadius: 3,
                px: { xxs: 2, md: 5 },
                py: 1.8,
                fontSize: { xxs: "0.9rem", md: "1rem" },
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(255, 87, 34, 0.04)",
                },
              }}
              onClick={() => navigate("/aboutUs")}
            >
              {t("About Us")}
            </Button>
          </Stack>

          {/* --- Social Proof --- */}
          <Stack
            direction={{ xxs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
            sx={{
              p: 1.5,
              borderRadius: 4,
              bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              width: "fit-content",
              mx: { xs: "auto", md: 0 },
              mt: 2,
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
            }}
          >
            {/* --- User's Image's --- */}

            <AvatarGroup
              max={4}
              sx={{
                "& .MuiAvatar-root": {
                  width: 35,
                  height: 35,
                  border: `2px solid ${
                    isDark ? theme.palette.background.paper : "#fff"
                  }`,
                },
              }}
            >
              <Avatar
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="user"
              />
              <Avatar
                src="https://randomuser.me/api/portraits/women/18.jpg"
                alt="user"
              />
              <Avatar
                src="https://randomuser.me/api/portraits/men/22.jpg"
                alt="user"
              />
              <Avatar
                src="https://randomuser.me/api/portraits/women/25.jpg"
                alt="user"
              />
            </AvatarGroup>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                textAlign: { xxs: "center", sm: "left" }, // النص نفسه يتوسط في الموبايل
              }}
            >
              {t("Join")}{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                {t("2,000+")}
              </Box>{" "}
              {t("happy foodies")}
            </Typography>
          </Stack>
        </Box>
        {/* --- Logo --- */}
        <Box
          component="img"
          src="/favBig.png"
          alt="Logo"
          sx={{
            height: {
              xxs: 280,
              sm: 320,
              md: 390,
              lg: 440,
            },
            filter: isDark
              ? "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.1))"
              : "none",
            transition: "all 0.4s ease",
            "&:hover": { transform: "rotate(5deg) scale(1.1)" },
            order: { xs: -1, xl: 2 },
          }}
        />
      </Box>
    </Box>
  );
}
