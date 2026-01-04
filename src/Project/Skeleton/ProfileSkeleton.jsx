import { Box, Card, Grid, Skeleton, Stack } from "@mui/material";

export default function ProfileSkeleton() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: { xs: "90%", md: "60%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          borderRadius: "0px 0px 80px 80px",
          mb: 8,
        }}
      >
        <Skeleton variant="circular" width={120} height={120} />
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rounded" width={120} height={32} />
        <Skeleton variant="rounded" width={160} height={40} />
      </Box>

      <Grid container spacing={3} sx={{ width: "90%" }}>
        {[...Array(5)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Skeleton variant="rounded" width="70%" height={45} sx={{ mt: 10 }} />
    </Box>
  );
}
