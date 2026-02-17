import {
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import React, { useCallback, useContext } from "react";
import { ShowCart } from "@else/Components/Context/MainContext";

const DialogCont = React.memo(() => {
  const { cartItems, setCartItems } = useContext(ShowCart);

  const { t } = useTranslation();
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Functions
  const onDecrease = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev
          .map((e) => (e.id === id ? { ...e, quantity: e.quantity - 1 } : e))
          .filter((e) => e.quantity > 0),
      );
    },
    [setCartItems],
  );

  const onIncrease = useCallback(
    (id) => {
      setCartItems((prev) =>
        prev.map((e) => (e.id === id ? { ...e, quantity: e.quantity + 1 } : e)),
      );
    },
    [setCartItems],
  );
  return (
    <>
      <DialogContent dividers sx={{ p: { xs: 1, sm: 2 } }}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          <Table size={fullScreen ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>{t("Product")}</TableCell>
                <TableCell align="center">{t("Quantity")}</TableCell>
                <TableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  {t("Price")}
                </TableCell>
                <TableCell align="center">{t("Total")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        noWrap
                        sx={{ maxWidth: 80 }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onDecrease(item.id)}
                        aria-label={t("Decrease")}
                      >
                        <RemoveCircleOutline fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 1, fontWeight: "bold" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onIncrease(item.id)}
                        aria-label={t("Increase")}
                      >
                        <AddCircleOutline fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    ${item.price}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </>
  );
});
export default DialogCont;
