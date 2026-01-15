import {
  alpha,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { cloneElement } from "react";

export function InfoRow({ icon, text, label, isDark }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{ minWidth: 0 }}
    >
      <Box
        sx={{
          color: isDark ? alpha("#fff", 0.3) : alpha("#000", 0.4),
          display: "flex",
          fontSize: 20,
        }}
      >
        {cloneElement(icon, { fontSize: "inherit" })}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            lineHeight: 1,
            opacity: 0.5,
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          noWrap
          sx={{ opacity: 0.9 }}
        >
          {text || "N/A"}
        </Typography>
      </Box>
    </Stack>
  );
}

// Sub-Component for Action Buttons
export function ActionButton({ icon, color, title }) {
  return (
    <Tooltip title={title} arrow pill>
      <IconButton
        size="small"
        sx={{
          bgcolor: alpha(color, 0.1),
          color: color,
          "&:hover": {
            bgcolor: color,
            color: "#fff",
            transform: "translateY(-3px)",
          },
          transition: "0.2s",
        }}
      >
        {cloneElement(icon, { sx: { fontSize: 18 } })}
      </IconButton>
    </Tooltip>
  );
}
