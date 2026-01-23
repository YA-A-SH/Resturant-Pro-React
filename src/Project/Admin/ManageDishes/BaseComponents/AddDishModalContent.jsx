import {
  CloudUploadRounded,
  DescriptionRounded,
  MonetizationOnRounded,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";

export default function Content({
  formData,
  handleInputChange,
  handleImageChange,
  errors,
  fileInputRef,
  theme,
}) {
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Left side: Image Upload */}
        <Grid item xs={12} md={5} sx={{ minWidth: "250px" }}>
          <Typography variant="body2" fontWeight={800} mb={1.5}>
            Dish Image
          </Typography>

          <Box
            onClick={() => fileInputRef.current.click()}
            sx={uploadBoxStyle(theme, formData.image, !!errors.image)}
          >
            {formData.image ? (
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <img
                  src={formData.image}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box className="overlay" sx={overlayStyle}>
                  <CloudUploadRounded sx={{ color: "#fff", fontSize: 40 }} />
                </Box>
              </Box>
            ) : (
              <Stack alignItems="center" spacing={1}>
                <CloudUploadRounded
                  sx={{ fontSize: 40, color: "text.disabled" }}
                />
                <Typography
                  variant="caption"
                  color="text.disabled"
                  fontWeight={700}
                >
                  Click to upload (PNG, JPG)
                </Typography>
              </Stack>
            )}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />
          </Box>

          {errors.image && (
            <Typography
              color="error"
              variant="caption"
              sx={{ mt: 1, display: "block", fontWeight: 700 }}
            >
              {errors.image}
            </Typography>
          )}
        </Grid>

        {/* Right side: Details */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Dish Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g. Signature Beef Burger"
              InputProps={{ sx: { borderRadius: "14px" } }}
            />

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              error={!!errors.price}
              helperText={errors.price}
              placeholder="0.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnRounded color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: "14px" },
              }}
            />

            <TextField
              fullWidth
              label="Recipe / Instructions"
              name="instructions"
              multiline
              rows={4}
              value={formData.instructions}
              onChange={handleInputChange}
              error={!!errors.instructions}
              helperText={errors.instructions}
              placeholder="Describe how to prepare this dish..."
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 1.5 }}
                  >
                    <DescriptionRounded color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: "14px" },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

const uploadBoxStyle = (theme, hasImage, isError) => ({
  width: "300px",
  height: { xs: 200 },
  minHeight: 250,
  borderRadius: "24px",
  border: "2px dashed",
  borderColor: isError
    ? theme.palette.error.main
    : hasImage
      ? "transparent"
      : theme.palette.divider,
  bgcolor: alpha(theme.palette.background.default, 0.5),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  overflow: "hidden",
  transition: "0.3s",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    bgcolor: alpha(theme.palette.primary.main, 0.02),
    "& .overlay": { opacity: 1 },
  },
});

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  bgcolor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "0.3s",
};
