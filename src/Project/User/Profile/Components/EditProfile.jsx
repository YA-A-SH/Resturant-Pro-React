import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function EditProfile({
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
      <DialogTitle textAlign="center">Edit Profile</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 400,
        }}
      >
        <TextField
          label="Your Name"
          value={
            accType === "Google Account" ? u.displayName : userMoreInfo.name
          }
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, name: e.target.value })
          }
          fullWidth
          disabled={accType === "Google Account" ? true : false}
        />
        <TextField
          type="number"
          label="Phone"
          value={userMoreInfo.phone}
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, phone: e.target.value })
          }
          fullWidth
        />
        <TextField
          label="Address"
          value={userMoreInfo.address}
          onChange={(e) =>
            setUserMoreInfo({ ...userMoreInfo, address: e.target.value })
          }
          fullWidth
        />
        <TextField
          label="Email"
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
