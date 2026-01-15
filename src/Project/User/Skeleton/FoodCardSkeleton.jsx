import { Card, CardContent, Box, Stack, Skeleton } from "@mui/material";

export default function FoodCardSkeleton() {
  return (
    <Card
      sx={{
        width: 300,
        transition: "0.4s",
      }}
    >
      {/* Image */}
      <Skeleton variant="rectangular" height={180} />

      <CardContent>
        {/* Title + Favorite */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>

        {/* Rating + Price */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={50} height={24} />
        </Box>

        {/* Buttons */}
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          mt={3}
        >
          <Skeleton
            variant="rectangular"
            width={110}
            height={36}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={110}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
