import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  CalendarToday,
  Email,
  LocationOn,
  Phone,
  Receipt,
} from "@mui/icons-material";
import React, { useMemo } from "react";

const InfoCards = React.memo(({ userMoreInfo }) => {
  const { t } = useTranslation();
  const u = JSON.parse(localStorage.getItem("user"));
  const accType =
    u?.providerData?.[0]?.providerId === "google.com"
      ? "Google Account"
      : "Email Account";

  const info = useMemo(
    () => [
      { icon: <Phone />, label: t("Phone"), value: userMoreInfo.phone },
      {
        icon: <LocationOn />,
        label: t("Address"),
        value: userMoreInfo.address,
      },
      {
        icon: <CalendarToday />,
        label: t("Joined On"),
        value: new Date(1766304856103).toDateString(),
      },
      {
        icon: <Receipt />,
        label: t("Last Login"),
        value: new Date(Number(u?.lastLoginAt)).toLocaleString(),
      },
      {
        icon: <Email />,
        label: t("Email"),
        value: accType === "Email Account" ? u?.email : userMoreInfo.mail,
      },
    ],
    [
      accType,
      t,
      u?.email,
      u?.lastLoginAt,
      userMoreInfo.address,
      userMoreInfo.mail,
      userMoreInfo.phone,
    ],
  );

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
                    {item.value || t("Not provided")}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
});
export default InfoCards;
