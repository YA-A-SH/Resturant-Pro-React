import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Autocomplete,
  Avatar,
  alpha,
  useTheme,
} from "@mui/material";
import {
  CloseRounded,
  CloudUploadRounded,
  PersonAddRounded,
} from "@mui/icons-material";

export default function AddChefModal({ open, chefs, setChefs, handleClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    salary: "",
    city: "",
    mail: "",
    img: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name Required";
    if (!formData.role) tempErrors.role = "Role Required";
    if (!formData.salary || formData.salary <= 0)
      tempErrors.salary = "Salary Must Be More Than 0";
    if (!formData.city) tempErrors.city = "Please Select The City";
    if (!formData.mail) {
      tempErrors.mail = "Email Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
      tempErrors.mail = "Please Write A Correct Email";
    }
    if (!formData.img) tempErrors.img = "Please Upload Chef Photo";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleClose();
      setChefs([...chefs, formData]);

      setFormData({
        name: "",
        role: "",
        salary: "",
        city: "",
        mail: "",
        img: null,
      });
    }
  };
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, img: reader.result });
      setErrors({ ...errors, img: "" });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    localStorage.setItem("chefs", JSON.stringify(chefs));
  }, [chefs]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "80%",
          borderRadius: "28px",
          p: 1,
          bgcolor: isDark ? "rgba(22, 22, 26, 0.95)" : "#fff",
          backdropFilter: "blur(10px)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              p: 1,
              bgcolor: alpha(theme.palette.admin.main, 0.1),
              borderRadius: "12px",
              color: "admin.main",
            }}
          >
            <PersonAddRounded />
          </Box>
          <Typography variant="h6" fontWeight={800}>
            Add New Chef
          </Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                src={formData.img || ""}
                sx={{
                  width: 110,
                  height: 110,
                  border: `3px solid ${theme.palette.admin.main}`,
                  bgcolor: alpha(theme.palette.admin.main, 0.05),
                }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "admin.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "admin.main", transform: "scale(1.1)" },
                }}
              >
                <CloudUploadRounded fontSize="small" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e.target.files[0]);
                  }}
                />
              </IconButton>
            </Box>
            {errors.img && (
              <Typography color="error" variant="caption" display="block">
                {errors.img}
              </Typography>
            )}
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              width: "100%",
            }}
          >
            <Grid item xs={12} sm={6} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Email"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                error={!!errors.mail}
                helperText={errors.mail}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                error={!!errors.salary}
                helperText={errors.salary}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: "100%" }}>
              <TextField
                label="Choose The City"
                error={!!errors.city}
                helperText={errors.city}
                fullWidth
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
          </Box>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          sx={{ color: "text.secondary", fontWeight: 700 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "admin.main",
            borderRadius: "14px",
            px: 4,
            py: 1.2,
            fontWeight: 800,
            textTransform: "none",
            "&:hover": {
              bgcolor: "admin.main",
              boxShadow: `0 8px 25px ${alpha(theme.palette.admin.main, 0.4)}`,
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
