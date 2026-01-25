import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function EditProfile({
  t,
  editOpen,
  handleEditClose,
  userMoreInfo,
  setUserMoreInfo,
  handleSave,
  u,
  accType,
}) {
  return (
    <Dialog open={editOpen} onClose={handleEditClose}>
      <DialogTitle textAlign="center">{t("Edit Profile")}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 400,
          p: 3,
        }}
      >
        <TextField
          label={t("Your Name")}
          value={
            accType === "Google Account" ? u.displayName : userMoreInfo.name
          }
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, name: e.target.value })
          }
          sx={{ mt: 2 }}
          fullWidth
          disabled={accType === "Google Account" ? true : false}
        />
        <TextField
          type="number"
          label={t("Phone")}
          value={userMoreInfo.phone}
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, phone: e.target.value })
          }
          fullWidth
        />
        <TextField
          label={t("Address")}
          value={userMoreInfo.address}
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, address: e.target.value })
          }
          fullWidth
        />
        <TextField
          label={t("Email")}
          type="email"
          value={userMoreInfo.mail}
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, mail: e.target.value })
          }
          error={userMoreInfo.mail.length === 0 ? true : false}
          fullWidth
          disabled={accType === "Google Account" ? false : true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          {t("Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
