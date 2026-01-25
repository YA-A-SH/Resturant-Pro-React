import { Box, Card, Grid, Stack, Typography } from "@mui/material";

export default function InfoCards({ info ,t }) {
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          width: "90%",
          mx: "auto",
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {info.map((item, i) => (
          <Grid item xxs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: 4,
                boxShadow: 4,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {item.icon}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography fontWeight="bold">
                    {item.value ||t("Not provided")}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
