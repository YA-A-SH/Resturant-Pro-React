import { Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box
      sx={{
        mt: 3,
        py: 2,
        textAlign: "center",
        bgcolor: "background.paper",
        backdropFilter: "blur(10px)",
      }}
    >
      {" "}
      <Typography variant="h6" color="text.secondary">
        {" "}
        © 2025 ZEUS Restaurant — Crafted by YA.A.SH{" "}
      </Typography>{" "}
      <Stack direction="row" justifyContent="center" spacing={2} mt={1}>
        {" "}
        <IconButton color="primary">
          {" "}
          <Facebook />{" "}
        </IconButton>{" "}
        <IconButton color="primary">
          {" "}
          <LinkedIn />{" "}
        </IconButton>{" "}
        <IconButton color="primary">
          {" "}
          <GitHub />{" "}
        </IconButton>{" "}
      </Stack>{" "}
    </Box>
  );
}
