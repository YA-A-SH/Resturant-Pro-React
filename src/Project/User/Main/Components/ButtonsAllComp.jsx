import { Box, Button } from "@mui/material";

export default function ButtonsAllComp({
  selectedType,
  setSelectedType,
  isDark,
  t,
}) {
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "fit-content" },
          m: "0 auto 50px auto",
          p: 0.8,
          borderRadius: "100px",
          bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
          display: "flex",
          gap: 1,
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.1)" : "transparent"
          }`,
          justifyContent: { xs: "space-evenly" },
        }}
      >
        {["Breakfast", "Lunch", "Dinner"].map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "contained" : "text"}
            onClick={() => setSelectedType(type)}
            sx={{
              borderRadius: "100px",
              px: { xs: 3, sm: 5 },
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              transition: "0.4s",
              boxShadow:
                selectedType === type ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
              color: selectedType === type ? "#fff" : "text.secondary",
              "&:hover": {
                bgcolor:
                  selectedType === type ? "primary.main" : "rgba(0,0,0,0.05)",
              },
            }}
          >
            {type === "Breakfast"
              ? t("Breakfast")
              : type === "Lunch"
                ? t("Lunch")
                : t("Dinner")}
          </Button>
        ))}
      </Box>
    </>
  );
}
