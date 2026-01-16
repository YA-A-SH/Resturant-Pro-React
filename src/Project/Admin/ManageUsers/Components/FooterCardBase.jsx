import {
  AdminPanelSettingsRounded,
  ArrowForwardIosRounded,
  BlockRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";
import { alpha, Box, Button, Stack, Tooltip } from "@mui/material";
import { ActionButton } from "./OtherCompForCard'sBase";

export default function FooterCardBase({ isDark, id, theme, configs }) {
  return (
    <>
      <Stack
        className="footer-action"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 2.5,
          transition: "0.3s",
          borderTop: `1px solid ${
            isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
          }`,
        }}
      >
        <Stack direction="row" spacing={1}>
          {id === "manager" ? (
            <Tooltip title="Full Admin Privileges">
              <Box
                sx={{
                  p: 1,
                  bgcolor: alpha(theme.palette.admin.main, 0.1),
                  borderRadius: "12px",
                  display: "flex",
                }}
              >
                <AdminPanelSettingsRounded
                  sx={{ color: theme.palette.admin.main }}
                />
              </Box>
            </Tooltip>
          ) : (
            <>
              <ActionButton
                icon={<VerifiedUserRounded />}
                color="#10B981"
                title="Verify User"
              />
              <ActionButton
                icon={<BlockRounded />}
                color="#EF4444"
                title="Restrict Access"
              />
            </>
          )}
        </Stack>

        <Button
          variant="contained"
          disableElevation
          endIcon={
            <ArrowForwardIosRounded sx={{ fontSize: "12px !important" }} />
          }
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#1e1e1e",
            color: "#fff",
            "&:hover": {
              background: configs.gradient,
              boxShadow: `0 8px 20px ${configs.mainColor}40`,
            },
          }}
        >
          View Profile
        </Button>
      </Stack>
    </>
  );
}
