import {
  AdminPanelSettingsRounded,
  ArrowForwardIosRounded,
  BlockRounded,
  CancelSharp,
  CancelTwoTone,
  TrendingUp,
  VerifiedUserRounded,
} from "@mui/icons-material";
import { alpha, Box, Button, Stack, Tooltip, useTheme } from "@mui/material";
import { ActionButton } from "./OtherCompForCard'sBase";
import { useNavigate } from "react-router-dom";
import { toggleBlocked, toggleVerified } from "@user/RTK/ElseSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function FooterCardBase({
  data,

  id,

  configs,
  setOpenEditSalaryPopup,
  setOpenDeleteChefPopup,
  setSnackbarAlert,
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isDark = theme.palette.mode === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/admin/manage-users/${id}`, {
      state: { userData: data },
    });
  };

  const handleVerifiedUser = () => {
    if (id === "user") {
      dispatch(toggleVerified(data.id));
      setSnackbarAlert({
        openSnackbar: true,
        message: data?.isVerified
          ? t("User Unverified Successfully!")
          : t("User Verified Successfully!"),
        color: data?.isVerified ? "error" : "success",
      });
    }
    return null;
  };

  const handleBlockedUser = () => {
    if (id === "user") {
      dispatch(toggleBlocked(data.id));
      setSnackbarAlert({
        openSnackbar: true,
        message: data?.isBlocked
          ? t("User Unblocked Successfully!")
          : t("User Blocked Successfully!"),
        color: data?.isBlocked ? "success" : "error",
      });
    }
    return null;
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
            <Tooltip title={t("Full Admin Privileges")}>
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
                icon={
                  data?.isVerified ? <CancelSharp /> : <VerifiedUserRounded />
                }
                color={data?.isVerified ? "#EF4444" : "#10B981"}
                title={data?.isVerified ? t("Unverify User") : t("Verify User")}
                handle={handleVerifiedUser}
              />
              <ActionButton
                icon={data?.isBlocked ? <CancelTwoTone /> : <BlockRounded />}
                color={data?.isBlocked ? "#0ad69c" : "#EF4444"}
                title={data?.isBlocked ? t("Unblock User") : t("Block User")}
                handle={handleBlockedUser}
              />
            </>
          ) : (
            <>
              <ActionButton
                icon={<TrendingUp />}
                color="#10B981"
                title={t("Update Salary $")}
                handle={() => setOpenEditSalaryPopup(true)}
              />
              <ActionButton
                icon={<CancelSharp />}
                color="#EF4444"
                title={t("Fire Chef 👨‍🍳")}
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
            scale: { xxs: 0.8, xs: 0.85, sm: 1 },
            color: "#fff",
            background: configs.gradient,
            "&:hover": {
              transform: "translate(5px,0px)",
              boxShadow: `0 8px 20px ${configs.mainColor}40`,
            },
          }}
          onClick={handleViewProfile}
        >
          {t("View Profile")}
        </Button>
      </Stack>
    </>
  );
}
