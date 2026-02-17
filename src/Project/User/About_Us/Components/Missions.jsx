import { EmojiObjects } from "@mui/icons-material";
import { Card, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const Mission = React.memo(({ msg, msgBody }) => {
  const theme = useTheme();
  const cardBg =
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff";
  const textSecondary = theme.palette.text.secondary;

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
});
export default Mission;
