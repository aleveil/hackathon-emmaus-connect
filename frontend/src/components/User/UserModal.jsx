/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ApiHelper from "../../services/ApiHelper";
import DeleteModal from "../DeleteModal";

export default function UserModal({ userId, open, handleClose, setLoadData }) {
  const [user, setUser] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({});

  const resetForm = (userData) => {
    const data = { ...userData };
    delete data.id;
    data.password = "";
    setFormData(data);
  };

  useEffect(() => {
    setUser({});
    ApiHelper(`/users/${userId}`, "get").then((res) =>
      res.json().then((res2) => {
        const userData = {
          username: res2.username,
          name: res2.name,
          isAdmin: res2.isAdmin === 1,
        };
        setUser(userData);
        resetForm(userData);
      })
    );
  }, [userId]);

  const handleCancelEdit = () => {
    setIsEditMode(false);
    resetForm(user);
  };

  const handleValidateEdit = () => {
    const dataToSend = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user[key] && formData[key] !== "")
        dataToSend[key] = formData[key];
    });
    if (Object.keys(dataToSend).length > 0)
      ApiHelper(
        `/users/${userId}`,
        "put",
        null,
        JSON.stringify(dataToSend)
      ).then(() => {
        setLoadData((prev) => !prev);
        setIsEditMode(false);
      });
    else {
      console.error("Data must be different");
    }
  };

  const handleField = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIsAdminField = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalAction = () => {
    ApiHelper(`/users/${userId}`, "delete").then(() => {
      setLoadData((prev) => !prev);
      setIsDeleteModalOpen(false);
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {Object.keys(user).length > 0 && (
        <div>
          {!isEditMode ? (
            <div>
              <DialogTitle>Fiche Utilisateur</DialogTitle>
              <DialogContent>
                <DialogContentText>Nom : {user.name}</DialogContentText>
                <DialogContentText>
                  Identifiant : {user.username}
                </DialogContentText>
                <DialogContentText>
                  Rôle : {user.isAdmin ? "Administrateur" : "Utilisateur"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Retour</Button>
                <Button onClick={() => setIsEditMode(true)}>Editer</Button>
                <Button onClick={handleOpenDeleteModal}>Supprimer</Button>
              </DialogActions>
              <DeleteModal
                open={isDeleteModalOpen}
                handleClose={() => setIsDeleteModalOpen(false)}
                handleAction={handleDeleteModalAction}
                title="Souhaitez-vous vraiment supprimer cet utilisateur ?"
              />
            </div>
          ) : (
            <div>
              <DialogTitle>Editer un utilisateur</DialogTitle>
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
                />
                <TextField
                  margin="dense"
                  id="password"
                  name="password"
                  label="Nouveau Mot de passe"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={formData.password}
                  onChange={handleField}
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
                <Button onClick={handleCancelEdit}>Annuler</Button>
                <Button onClick={handleValidateEdit}>Valider</Button>
              </DialogActions>
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
}
