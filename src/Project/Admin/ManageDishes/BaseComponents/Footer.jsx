import { ArrowForwardRounded, AssessmentRounded } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function FooterSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 8,
        p: 4,
        borderRadius: "40px",
        bgcolor: theme.palette.admin.main,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", right: -20, top: -20, opacity: 0.1 }}>
        <AssessmentRounded sx={{ fontSize: 200 }} />
      </Box>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight={900} mb={1}>
            {t("Ready to scale your business?")}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 500 }}>
            {t("desc 21")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} textAlign={{ md: "right" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: theme.palette.admin.main,
              fontWeight: 900,
              px: 4,
              py: 2,
              borderRadius: "15px",
              "&:hover": { bgcolor: alpha("#fff", 0.9) },
            }}
            endIcon={<ArrowForwardRounded />}
            onClick={() => navigate("/admin")}
          >
            {t("Export Reports")}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4, borderColor: alpha("#fff", 0.2) }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ opacity: 0.8 }}
      >
        <Typography variant="caption" fontWeight={700}>
          {t(" © 2024 Admin Panel Dashboard")}
        </Typography>
        <Stack direction="row" spacing={3}>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ cursor: "pointer" }}
          >
            {t("Support")}
          </Typography>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ cursor: "pointer" }}
          >
            {t("Privacy Policy")}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
