/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ApiHelper from "../../services/ApiHelper";

export default function UserAddModal({ open, handleClose, setLoadData }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    isAdmin: false,
  });

  const handleField = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIsAdminField = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      name: "",
      isAdmin: false,
    });
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const handleAdd = () => {
    ApiHelper("/users", "post", null, JSON.stringify(formData)).then(() => {
      setLoadData((prev) => !prev);
      resetForm();
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          name="name"
          label="Nom"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={handleField}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="username"
          name="username"
          label="Identifiant"
          type="text"
          fullWidth
          variant="standard"
          value={formData.username}
          onChange={handleField}
          required
        />
        <TextField
          margin="dense"
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
          fullWidth
          variant="standard"
          value={formData.password}
          onChange={handleField}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isAdmin}
              onClick={handleIsAdminField}
              name="isAdmin"
            />
          }
          label="Administrateur"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Annuler</Button>
        <Button onClick={handleAdd}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}
