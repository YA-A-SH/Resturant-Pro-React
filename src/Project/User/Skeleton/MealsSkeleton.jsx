import { Box, Grid, Skeleton } from "@mui/material";

export default function MealsSkeleton() {
  return (
    <Box sx={{ pt: 5, px: { xs: 2, md: 6 } }}>
      <Skeleton
        variant="rounded"
        height={70}
        width="70%"
        sx={{ mx: "auto", mb: 4 }}
      />

      <Grid container spacing={4} justifyContent="center">
        {[...Array(8)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Skeleton variant="rounded" height={320} width={300} />
            <Skeleton width="80%" sx={{ mt: 1 }} />
            <Skeleton width="60%" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
