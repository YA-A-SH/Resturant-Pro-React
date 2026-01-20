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
      spacing={1.8}
      alignItems="center"
      sx={{
        minWidth: 0,
        group: "info-row",
      }}
    >
      <Box
        sx={{
          color: isDark ? alpha("#fff", 0.4) : alpha("#1A1A1A", 0.5),
          display: "flex",
          p: 0.8,
          borderRadius: "10px",
          bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          fontSize: 20,
          transition: "0.3s",
        }}
      >
        {cloneElement(icon, { fontSize: "inherit" })}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            lineHeight: 1.2,
            opacity: 0.5,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: "0.65rem",
            mb: 0.2,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={700}
          noWrap
          sx={{
            color: isDark ? "#fff" : "#1A1A1A",
            opacity: 0.9,
            fontSize: "0.85rem",
          }}
        >
          {text || "N/A"}
        </Typography>
      </Box>
    </Stack>
  );
}

export function ActionButton({ icon, color, title, handle }) {
  return (
    <Tooltip
      title={title}
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#1A1A1A",
            fontWeight: 800,
            borderRadius: "8px",
            fontSize: "0.7rem",
            px: 1.5,
          },
        },
        arrow: { sx: { color: "#1A1A1A" } },
      }}
    >
      <IconButton
        onClick={handle}
        size="medium"
        sx={{
          bgcolor: alpha(color, 0.08),
          color: color,
          p: 1.2,
          borderRadius: "14px",
          border: "1px solid",
          borderColor: alpha(color, 0.1),
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            bgcolor: color,
            color: "#fff",
            transform: "translateY(-4px)",
            boxShadow: `0 8px 15px ${alpha(color, 0.4)}`,
            borderColor: "transparent",
          },
          "&:active": {
            transform: "scale(0.92)",
          },
        }}
      >
        {cloneElement(icon, { sx: { fontSize: 20 } })}
      </IconButton>
    </Tooltip>
  );
}
