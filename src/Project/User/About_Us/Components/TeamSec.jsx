import { ChefsContext } from "@else/Components/Context/MainContext";
import { GroupsRounded } from "@mui/icons-material";
import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const TeamSec = React.memo(() => {
  const { t } = useTranslation();
  const { chefs } = useContext(ChefsContext);

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <GroupsRounded sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: -1 }}>
            {t("The Architects of Taste")}
          </Typography>
        </Stack>

        <Grid
          container
          spacing={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chefs.map((member) => (
            <Grid key={member.name} item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: "center", position: "relative" }}>
                <Avatar
                  src={member.img}
                  sx={{
                    width: 120,
                    height: 170,
                    mx: "auto",
                    mb: 3,
                    borderRadius: 6,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    objectFit: "cover",
                  }}
                  variant="rounded"
                />
                <Typography variant="h6" fontWeight="800">
                  {member.name}
                </Typography>
                <Typography
                  color="primary"
                  fontWeight="bold"
                  variant="body2"
                  sx={{ textTransform: "uppercase", letterSpacing: 1.5 }}
                >
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
});
export default TeamSec;
