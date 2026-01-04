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
} from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

export default function DialogCont({
  fullScreen,
  cartItems,
  onDecrease,
  onIncrease,
  totalPrice,
}) {
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
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell
                  align="center"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  Price
                </TableCell>
                <TableCell align="center">Total</TableCell>
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

        <Box sx={{ mt: 10, textAlign: "center", px: 2 }}>
          <Typography variant="h5" color="text.secondary">
            Total Amount:
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={800}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
    </>
  );
}
