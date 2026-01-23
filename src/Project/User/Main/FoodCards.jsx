import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useContext, useState } from "react";
import { ShowCart } from "../Context/MainContext";

export default function FoodCard({
  id,
  image,
  title,
  price,
  rate,
  favorite,
  toggleFavorite,
  setOpenSnackbar,
}) {
  // Hooks Use
  const { setShow, setCartItems } = useContext(ShowCart);
  const [openDet, setOpenDet] = useState(false);
  const theme = useTheme();

  // Variables
  const isDark = theme.palette.mode === "dark";

  // Functions
  function handleAddToCartClick() {
    setCartItems((prev) => {
      const found = prev.find((e) => e.id === id);
      if (found) {
        return prev.map((e) =>
          e.id === id ? { ...e, quantity: e.quantity + 1 } : e,
        );
      }
      return [...prev, { id, image, title, price, quantity: 1 }];
    });
    setOpenSnackbar({
      open: true,
      msg: "Tasty choice! Added to your cart 🍔",
      color: "success",
    });
    setTimeout(() => {
      setOpenSnackbar({ open: false, msg: "", color: "" });
    }, 3000);
    setShow(true);
  }

  return (
    <Card
      sx={{
        width: { xxs: 250, xs: 300 },
        // scale: { xxs: 0.9, sm: 1 },
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        backgroundColor: "background.paper",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDark
            ? "0 12px 20px rgba(182, 182, 182, 0.7)"
            : "0 12px 20px rgba(0, 0, 0, 0.61)",
          "& .card-media": { transform: "scale(1.05)" },
        },
      }}
    >
      {/* Favorite Button  */}

      <IconButton
        onClick={() => toggleFavorite(id)}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(4px)",
          "&:hover": { backgroundColor: "primary.main", color: "#fff" },
        }}
        aria-label="Add To Favorite"
      >
        {favorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>

      {/* Food Image */}

      <Box sx={{ overflow: "hidden" }}>
        <CardMedia
          className="card-media"
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ transition: "0.5s ease" }}
        />
      </Box>

      {/* Food Info  */}

      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight="700" noWrap sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Rating value={rate} precision={0.5} readOnly size="small" />
          <Typography variant="h6" color="primary.main" fontWeight="800">
            ${price}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCartClick}
            sx={{
              borderRadius: "12px",
              py: 1.2,
              fontWeight: "bold",
              boxShadow: "none",
              background: theme.palette.primary.main,
              "&:hover": {
                background: theme.palette.primary.dark,
                boxShadow: "none",
              },
            }}
            aria-label="Add"
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenDet(true)}
            sx={{
              borderRadius: "12px",
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
              color: "text.primary",
              minWidth: "fit-content",
              px: 2,
              "&:hover": { borderColor: "primary.main" },
            }}
            aria-label="More Info"
          >
            Info
          </Button>
        </Stack>
      </CardContent>

      {/* Food More Info  */}

      <Dialog
        open={openDet}
        onClose={() => setOpenDet(false)}
        PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}
      >
        <DialogTitle fontWeight="bold">{title}</DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={image}
            sx={{ width: "100%", borderRadius: "16px", mb: 2 }}
          />
          <Typography variant="body1" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            aspernatur a minus dolores rerum sequi soluta atque assumenda
            officia adipisci. Voluptate quisquam soluta dolor sunt, aperiam
            deleniti fuga praesentium modi.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => setOpenDet(false)}
            color="warning"
            variant="outlined"
            aria-label="Close"
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleAddToCartClick}
            sx={{ borderRadius: "10px" }}
            aria-label="Order Now"
          >
            Order Now
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
