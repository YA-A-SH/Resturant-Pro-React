import {
  HistoryEduRounded,
  WorkspacePremiumRounded,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function BaseDetails({ configs, type }) {
  return (
    <>
      <Grid item xs={12} md={5}>
        <Stack spacing={4}>
          {/* Info Card */}
          <Card
            sx={{
              p: 4,
              borderRadius: "30px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              mb={3}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <HistoryEduRounded sx={{ color: configs.mainColor }} /> Personal
              Biography
            </Typography>
            <Stack spacing={2.5}>
              {configs.details.map((detail, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: configs.mainColor,
                    }}
                  />
                  <Typography variant="body1" fontWeight={500}>
                    {detail}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary">
              Registered on:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Card>

          {/* Achievement Card */}
          <Card
            sx={{
              p: 4,
              borderRadius: "30px",
              background: `linear-gradient(to right bottom, ${alpha(configs.mainColor, 0.05)}, transparent)`,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" fontWeight={900}>
                  Trust Level
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Identity Verified
                </Typography>
              </Box>
              <WorkspacePremiumRounded
                sx={{ fontSize: 50, color: configs.mainColor }}
              />
            </Stack>
          </Card>
        </Stack>
        {/* iNFO */}

        <Grid
          container
          spacing={2}
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: alpha(configs.mainColor, 0.05),
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={900}
                color={configs.mainColor}
              >
                {type === "chef" ? "8.5" : type === "user" ? "12k" : "99%"}
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                {type === "chef"
                  ? "Avg Rating"
                  : type === "user"
                    ? "Points"
                    : "System Uptime"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: alpha(configs.mainColor, 0.05),
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={900}
                color={configs.mainColor}
              >
                {type === "chef" ? "24" : type === "user" ? "2" : "Active"}
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                {type === "chef"
                  ? "Awards"
                  : type === "user"
                    ? "Coupons"
                    : "Status"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
