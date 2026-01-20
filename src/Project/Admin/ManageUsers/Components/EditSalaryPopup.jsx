import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputAdornment,
  alpha,
  Box,
  IconButton,
} from "@mui/material";
import {
  CloseRounded,
  PaymentsRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { ChefsContext } from "../../../User/Context/MainContext";

export default function EditSalaryPopup({
  open,
  mainColor,
  setOpenEditSalaryPopup,
  id,
}) {
  const { chefs, setChefs } = useContext(ChefsContext);

  const theChef = chefs.find((chef) => String(chef.id) === String(id));

  const [value, setValue] = useState("");

  const onClose = () => {
    setOpenEditSalaryPopup(false);
  };
  useEffect(() => {
    if (open && theChef) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(theChef.salary || "");
    }
  }, [open, theChef]);

  const handleConfirm = () => {
    const updatedChefs = chefs.map((chef) => {
      if (chef.id === id) {
        return { ...chef, salary: value };
      }
      return chef;
    });

    setChefs(updatedChefs);
    setOpenEditSalaryPopup(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: motion.div,
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        sx: {
          borderRadius: "28px",
          padding: 2,
          width: "100%",
          maxWidth: 400,
          backdropFilter: "blur(15px)",
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9),
          boxShadow: `0 20px 60px ${alpha("#000", 0.3)}`,
          backgroundImage: "none",
          zIndex: 99999,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={900}>
          Update Salary
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ bgcolor: alpha("#000", 0.05) }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 1 }}>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Adjust the monthly compensation for this chef. Changes will be
            reflected in payroll.
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Monthly Salary"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. $5,000"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PaymentsRounded sx={{ color: mainColor }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "16px",
                fontWeight: 800,
                "& fieldset": { borderColor: alpha(mainColor, 0.2) },
                "&:hover fieldset": { borderColor: mainColor },
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            color: "text.secondary",
            bgcolor: alpha("#000", 0.05),
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          startIcon={<CheckCircleRounded />}
          sx={{
            borderRadius: "12px",
            fontWeight: 800,
            bgcolor: mainColor,
            boxShadow: `0 8px 20px ${alpha(mainColor, 0.3)}`,
            "&:hover": { bgcolor: mainColor, filter: "brightness(1.1)" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
