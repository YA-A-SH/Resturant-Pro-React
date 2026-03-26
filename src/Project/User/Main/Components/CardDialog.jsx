import React from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const CardDialog = React.memo(
  ({ openDet, setOpenDet, title, image, handleAddToCartClick }) => {
    const { t } = useTranslation();

    return (
      <>
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
              {t("Close")}
            </Button>
            <Button
              variant="contained"
              onClick={handleAddToCartClick}
              sx={{ borderRadius: "10px" }}
              aria-label="Order Now"
            >
              {t("Order Now")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
);

export default CardDialog;
