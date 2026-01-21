import {
  AdminPanelSettingsRounded,
  ArrowForwardIosRounded,
  BlockRounded,
  CancelSharp,
  TrendingUp,
  VerifiedUserRounded,
} from "@mui/icons-material";
import { alpha, Box, Button, Stack, Tooltip } from "@mui/material";
import { ActionButton } from "./OtherCompForCard'sBase";
import { useNavigate } from "react-router-dom";

export default function FooterCardBase({
  data,
  isDark,
  id,
  theme,
  configs,
  setOpenEditSalaryPopup,
  setOpenDeleteChefPopup,
}) {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/admin/manage-users/${id}`, {
      state: { userData: data },
    });
  };

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
          ) : id === "user" ? (
            <>
              <ActionButton
                icon={<VerifiedUserRounded />}
                color="#10B981"
                title="Verify User"
              />
              <ActionButton
                icon={<BlockRounded />}
                color="#EF4444"
                title="Block User"
              />
            </>
          ) : (
            <>
              <ActionButton
                icon={<TrendingUp />}
                color="#10B981"
                title="Update Salary $"
                handle={() => setOpenEditSalaryPopup(true)}
              />
              <ActionButton
                icon={<CancelSharp />}
                color="#EF4444"
                title="Fire Chef 👨‍🍳"
                handle={() => setOpenDeleteChefPopup(true)}
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
            transition: "0.3s",
            fontWeight: 800,
            px: 2.5,
            color: "#fff",
            background: configs.gradient,
            "&:hover": {
              transform: "translate(5px,0px)",
              boxShadow: `0 8px 20px ${configs.mainColor}40`,
            },
          }}
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </Stack>
    </>
  );
}
