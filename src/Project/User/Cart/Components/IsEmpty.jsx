import { Avatar, Box, Button, Typography } from "@mui/material";

export default function IsEmpty({ navigate, setShow, t }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          textAlign: "center",
          gap: 2,
          p: 3,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.light",
            width: 120,
            height: 120,
            fontSize: 60,
          }}
        >
          🛒
        </Avatar>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ animation: "bounce 1.2s infinite" }}
        >
          {t("Your Cart is Empty!")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
       {t("desc 6")}

        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => {
            setShow(false);
            navigate("/meals");
          }}
        >
         {t("Go Shopping")}

        </Button>
      </Box>
    </>
  );
}
