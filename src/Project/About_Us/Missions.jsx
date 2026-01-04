import { EmojiObjects } from "@mui/icons-material";
import { Card, Grid, Stack, Typography } from "@mui/material";

export default function Mission({
  cardBg,
  theme,
  textSecondary,
  msg,
  msgBody,
}) {
  return (
    <>
      <Grid item xs={12} md={6}>
        {" "}
        <Card sx={{ p: 3, bgcolor: cardBg }}>
          {" "}
          <Stack direction="row" spacing={2} alignItems="center">
            {" "}
            <EmojiObjects
              sx={{ fontSize: 40, color: theme.palette.primary.main }}
            />{" "}
            <Typography variant="h6" fontWeight="bold">
              {" "}
              {msg}{" "}
            </Typography>{" "}
          </Stack>{" "}
          <Typography sx={{ mt: 2, color: textSecondary }}>
            {" "}
            {msgBody}
          </Typography>{" "}
        </Card>{" "}
      </Grid>
    </>
  );
}
