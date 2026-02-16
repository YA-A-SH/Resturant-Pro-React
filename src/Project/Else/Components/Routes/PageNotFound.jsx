import { Box, Typography, Button, Stack, alpha, useTheme } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { KeyboardBackspaceRounded } from "@mui/icons-material";

export default function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#050505",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          top: "-10%",
          left: "-10%",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha("#F59E0B", 0.1)} 0%, transparent 70%)`,
          bottom: "-5%",
          right: "-5%",
          filter: "blur(60px)",
        }}
      />

      {/* Main */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", zIndex: 1 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "120px", md: "240px" },
            fontWeight: 900,
            lineHeight: 1,
            mb: 0,
            background:
              "linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-10px",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
          }}
        >
          404
        </Typography>

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ marginBottom: "20px" }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.secondary", fontWeight: 700 }}
          >
            🍔 Oops! Kitchen is Empty
          </Typography>
        </motion.div>

        <Typography
          variant="body1"
          sx={{
            color: alpha("#fff", 0.6),
            maxWidth: "450px",
            mx: "auto",
            mb: 5,
            fontWeight: 500,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          The page you are looking for is not found maybe someone ate it !
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            size="large"
            startIcon={<KeyboardBackspaceRounded />}
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: "16px",
              px: 4,
              py: 2,
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "none",
              borderColor: alpha("#fff", 0.2),
              color: "#fff",
              "&:hover": {
                borderColor: "#fff",
                bgcolor: alpha("#fff", 0.05),
              },
              transition: "0.3s",
            }}
          >
            Go Back
          </Button>
        </Stack>
      </motion.div>

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: alpha("#fff", 0.3),
            // eslint-disable-next-line react-hooks/purity
            top: `${Math.random() * 100}%`,
            // eslint-disable-next-line react-hooks/purity
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            // eslint-disable-next-line react-hooks/purity
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            // eslint-disable-next-line react-hooks/purity
            delay: Math.random() * 5,
          }}
        />
      ))}
    </Box>
  );
}
