import { EditRounded } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function BaseHeader({ configs, data, isDark, theme }) {
  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          borderRadius: "40px",
          overflow: "hidden",
          bgcolor: isDark ? "#16161a" : "#fff",
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          mb: 4,
        }}
      >
        <Box
          sx={{
            height: 180,
            background: configs.gradient,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "url('https://www.transparenttextures.com/patterns/cubes.png')",
              opacity: 0.2,
            }}
          />
        </Box>

        <Box sx={{ p: { xs: 3, md: 5 }, mt: -10, position: "relative" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems={{ xs: "center", md: "flex-end" }}
            justifyContent="space-between"
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              alignItems="center"
            >
              <Avatar
                src={data?.img || data?.image}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: "40px",
                  border: `6px solid ${isDark ? "#16161a" : "#fff"}`,
                  boxShadow: theme.shadows[10],
                }}
              />
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{ letterSpacing: -1.5 }}
                >
                  {data?.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {data?.email || data?.mail}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1.5}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <Chip
                    label={configs.tag}
                    sx={{
                      bgcolor: alpha(configs.mainColor, 0.15),
                      color: configs.mainColor,
                      fontWeight: 900,
                    }}
                  />
                  <Chip
                    // eslint-disable-next-line react-hooks/purity
                    label={`ID: #${Math.floor(Math.random() * 9000) + 1000}`}
                    variant="outlined"
                  />
                </Stack>
              </Box>
            </Stack>
            <Button
              variant="contained"
              startIcon={<EditRounded />}
              sx={{
                borderRadius: "18px",
                px: 4,
                py: 1.5,
                bgcolor: configs.mainColor,
                fontWeight: 800,
                "&:hover": {
                  bgcolor: configs.mainColor,
                  transform: "scale(1.05)",
                },
              }}
            >
              Manage Account
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
