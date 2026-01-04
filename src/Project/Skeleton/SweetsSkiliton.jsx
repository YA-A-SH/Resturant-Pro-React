import { Box, Grid, Skeleton } from "@mui/material";

export default function SweetsSkeleton() {
  return (
    <Box sx={{ pt: 5, px: { xs: 2, md: 6 } }}>
      <Skeleton width={300} height={55} sx={{ mx: "auto", mb: 2 }} />
      <Skeleton width={400} height={20} sx={{ mx: "auto", mb: 6 }} />

      <Grid container spacing={4} justifyContent="center">
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Skeleton variant="rounded" height={300} width={300} />
            <Skeleton width="75%" sx={{ mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
