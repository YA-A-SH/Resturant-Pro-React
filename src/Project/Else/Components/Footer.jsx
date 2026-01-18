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
        <IconButton
          color="primary"
          component="a"
          href="https://www.facebook.com/yaser.shkfa"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Facebook />{" "}
        </IconButton>{" "}
        <IconButton
          color="primary"
          component="a"
          href="https://www.linkedin.com/in/ya-a-sh-4494743a3"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <LinkedIn />{" "}
        </IconButton>{" "}
        <IconButton
          color="primary"
          component="a"
          href="https://github.com/YA-A-SH"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />{" "}
        </IconButton>{" "}
      </Stack>{" "}
    </Box>
  );
}
