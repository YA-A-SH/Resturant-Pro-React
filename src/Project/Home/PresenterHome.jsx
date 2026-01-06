import {
  Box,
  Typography,
  Stack,
  Container,
  Button,
  Grid,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import { ArrowForward, LocalMall } from "@mui/icons-material";
import FoodCard from "../Main/FoodCards";
import FoodCardSkeleton from "../Skeleton/FoodCardSkeleton";

export default function HomePre({
  loading,
  error,
  popularMeals,
  toggleFavorite,
  theme,
  navigate,
  isDark,
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark ? "#050505" : "#f8f9fa",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 10, md: 15 },
        pb: 8,
      }}
    >
      {/* عناصر خلفية جمالية (Blobs) */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background: isDark
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(0, 0, 0, 0.02)",
          filter: "blur(80px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* --- Hero Section --- */}
        <Grid container spacing={4} alignItems="center" mb={12}>
          <Grid item xs={12} md={8} lg={7}>
            <Stack
              spacing={{ xs: 4, md: 5 }}
              alignItems={{ xs: "center", md: "flex-start" }} // توسيط في الموبايل، يسار في الكبير
              textAlign={{ xs: "center", md: "left" }} // نص بالوسط للموبايل
            >
              {/* --- Header Area: Logo + Typography --- */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row-reverse" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: { xs: "center", md: "left" },
                  width: "100%",
                  gap: { xs: 5, md: 15, lg: 25, xl: 35 },
                  maxWidth: "1400px",
                  mx: "auto",
                }}
              >
                <Box
                  component="img"
                  src="/favBig.png"
                  alt="Logo"
                  sx={{
                    height: {
                      xs: 280,
                      sm: 320,
                      md: 390,
                      lg: 440,
                    },
                    filter: isDark
                      ? "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.1))"
                      : "none",
                    transition: "all 0.4s ease",
                    "&:hover": { transform: "rotate(5deg) scale(1.1)" },
                    order: { xs: -1, xl: 2 }, // اللوجو يظهر أول واحد فوق في الموبايل
                  }}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      letterSpacing: { xs: 1, md: 3 },
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.8rem",
                        md: "0.9rem",
                        lg: "1rem",
                      },
                    }}
                  >
                    Pure Taste, Pure Quality
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        xs: "2.2rem",
                        sm: "2.7rem",
                        md: "3.2rem",
                        lg: "4.1rem",
                      }, // تدرج ذكي للأحجام
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
                    Experience Real <br />
                    <Box
                      component="span"
                      sx={{
                        color: "primary.main",
                        WebkitTextFillColor: "initial",
                      }}
                    >
                      Taste
                    </Box>{" "}
                    in Gaza
                  </Typography>

                  {/* --- Description --- */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      maxWidth: { xs: "90%", md: 550 },
                      lineHeight: 1.7,
                      fontSize: { xs: "0.95rem", md: "1.1rem" },
                      fontWeight: 400,
                    }}
                  >
                    Discover a world of premium flavors crafted with passion.
                    From our kitchen to your doorstep, with love and Palestinian
                    pride.
                  </Typography>

                  {/* --- Buttons --- */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{
                      width: "100%", // العرض كامل دائماً للتحكم في التوزيع الداخلي
                      // في الموبايل (xs) نوسط الأزرار
                      // من (sm) فما فوق، نضبطها لليسار (أو للمركز حسب رغبتك)
                      justifyContent: { xs: "center", md: "flex-start" },
                      alignItems: "center", // لضمان توازن الأزرار عمودياً
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<LocalMall />}
                      sx={{
                        // في الموبايل الزر يأخذ العرض كامل، في الشاشات الأكبر يأخذ حجم محتواه فقط
                        width: { xs: "100%", sm: "200px", md: "auto" },
                        borderRadius: 3,
                        px: { xs: 2, md: 5 },
                        py: 1.8,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        textTransform: "none",
                        boxShadow: "0 10px 20px -5px rgba(255, 87, 34, 0.3)",
                        whiteSpace: "nowrap", // يمنع النص من النزول لسطر جديد
                      }}
                      onClick={() => navigate("/meals")}
                    >
                      Order Now
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      endIcon={<ArrowForward />}
                      sx={{
                        // توحيد العرض مع الزر الأول في الشاشات الصغيرة (sm) لجمالية أفضل
                        width: { xs: "100%", sm: "200px", md: "auto" },
                        borderRadius: 3,
                        px: { xs: 2, md: 5 },
                        py: 1.8,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "rgba(255, 87, 34, 0.04)", // خلفية خفيفة جداً عند الحوم
                        },
                      }}
                      onClick={() => navigate("/aboutUs")}
                    >
                      About Us
                    </Button>
                  </Stack>

                  {/* --- Social Proof --- */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    spacing={2}
                    sx={{
                      p: 1.5,
                      borderRadius: 4,
                      bgcolor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                      width: "fit-content",

                      // الحل السحري هنا:
                      // في الموبايل (xs) المارجن auto من اليمين واليسار يعني "توسيط"
                      // في الكبير (md) المارجن من اليمين 0 واليسار 0 يعني "التزام بالطرف"
                      mx: { xs: "auto", md: 0 },

                      // لإضافة لمسة احترافية ومنع الالتصاق بما قبله
                      mt: 2,
                      border: "1px solid",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <AvatarGroup
                      max={4}
                      sx={{
                        "& .MuiAvatar-root": {
                          width: 35,
                          height: 35,
                          // تأكد من تغير لون البوردر للـ Avatar في الدارك مود عشان يبرز
                          border: `2px solid ${
                            isDark ? theme.palette.background.paper : "#fff"
                          }`,
                        },
                      }}
                    >
                      <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/women/18.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/men/22.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/women/25.jpg" />
                    </AvatarGroup>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        textAlign: { xs: "center", sm: "left" }, // النص نفسه يتوسط في الموبايل
                      }}
                    >
                      Join{" "}
                      <Box component="span" sx={{ color: "primary.main" }}>
                        2,000+
                      </Box>{" "}
                      happy foodies
                    </Typography>
                  </Stack>
                </Box>

                {/* اللوجو: بجانب النص في الكبير، وتحته في الموبايل بشكل مميز */}
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* --- Popular Meals Section --- */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          mb={4}
        >
          <Box>
            <Typography
              variant="h2"
              fontWeight={800}
              gutterBottom
              color="primary.main"
            >
              Popular Dishes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Most ordered items this week
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 4,
            px: 2,
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              borderRadius: 10,
              "&:hover": { bgcolor: "primary.main" },
            },
          }}
        >
          {loading ? (
            [1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ minWidth: 300, scrollSnapAlign: "start" }}>
                <FoodCardSkeleton />
              </Box>
            ))
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            popularMeals.map((meal) => (
              <Box
                key={meal.id}
                sx={{ minWidth: 300, scrollSnapAlign: "start", p: 3 }}
              >
                <FoodCard {...meal} toggleFavorite={toggleFavorite} />
              </Box>
            ))
          )}
        </Box>

        {/* --- Footer Info --- */}
        <Box
          sx={{
            mt: 10,
            p: 6,
            borderRadius: 10,
            textAlign: "center",
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontWeight: 500,
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            "Based in Gaza, we deliver premium-quality food with care, passion,
            and modern presentation."
          </Typography>
        </Box>
      </Container>

      {/* Snackbar remains the same */}
    </Box>
  );
}
