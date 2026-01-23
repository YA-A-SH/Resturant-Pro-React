import { useState, useRef } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  alpha,
  useTheme,
  Backdrop,
  Fade,
  InputAdornment,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  CloseRounded,
  CloudUploadRounded,
  FastfoodRounded,
  MonetizationOnRounded,
  DescriptionRounded,
} from "@mui/icons-material";
import Content from "./AddDishModalContent";

export default function AddDishModal({ open, setOpen, type = "meal" }) {
  const theme = useTheme();
  const fileInputRef = useRef(null);

  // --- States ---
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    instructions: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- Functions ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size is too large (Max 2MB)");
        return;
      }
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Dish name is required";
    if (!formData.price || formData.price <= 0)
      tempErrors.price = "Enter a valid price";
    if (!formData.instructions.trim())
      tempErrors.instructions = "Recipe instructions are required";
    if (!formData.image) tempErrors.image = "Please upload an image";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      console.log("Dish Submitted:", formData);
      setLoading(false);
      setOpen(false);
      setFormData({ name: "", price: "", instructions: "", image: null });
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={() => !loading && setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { backdropFilter: "blur(8px)", bgcolor: "rgba(0,0,0,0.4)" },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 700 },
            bgcolor: "background.paper",
            borderRadius: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            p: 4,
            outline: "none",
            overflow: "auto",
            minHeight: "400px",
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  borderRadius: "10px",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              >
                <FastfoodRounded />
              </Box>
              <Typography variant="h5" fontWeight={900}>
                Add New {type}
              </Typography>
            </Stack>
            <IconButton onClick={() => setOpen(false)} disabled={loading}>
              <CloseRounded />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 4, borderStyle: "dashed" }} />

          {/* Form Content */}
          <Content
            handleImageChange={handleImageChange}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            fileInputRef={fileInputRef}
            theme={theme}
          />

          {/* Footer Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={5}>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: "12px",
                px: 4,
                fontWeight: 700,
                color: "text.secondary",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                borderRadius: "12px",
                px: 6,
                py: 1.5,
                fontWeight: 900,
                boxShadow: theme.shadows[4],
                bgcolor: theme.palette.primary.main,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save Dish"
              )}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
