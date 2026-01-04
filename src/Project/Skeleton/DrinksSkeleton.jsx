import { Box, Grid, Skeleton } from "@mui/material";

export default function DrinksSkeleton() {
  return (
    <Box sx={{ pt: 5, px: { xs: 2, md: 6 } }}>
      <Skeleton width={250} height={50} sx={{ mx: "auto", mb: 3 }} />
      <Skeleton width={350} height={20} sx={{ mx: "auto", mb: 6 }} />

      <Grid container spacing={4} justifyContent="center">
        {[...Array(8)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Skeleton variant="rounded" height={280} width={300} />
            <Skeleton width="70%" sx={{ mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
