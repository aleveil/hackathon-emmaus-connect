/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ApiHelper from "../../services/ApiHelper";
import DeleteModal from "../DeleteModal";
import { useToken } from "../../context/TokenContext";

export default function PhoneModal({
  phoneId,
  open,
  handleClose,
  setLoadData,
}) {
  const { token } = useToken();

  const inputRef = useRef(null);
  const [imageName, setImageName] = useState("");

  const [phone, setPhone] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [phoneData, setPhoneData] = useState({});

  const [loadCurrentData, setLoadCurrentData] = useState(false);

  const resetForm = (currentPhoneData) => {
    const data = { ...currentPhoneData };
    delete data.id;
    setPhoneData(data);
    setImageName("");
  };

  useEffect(() => {
    setPhone({});
    ApiHelper(`/phones/${phoneId}`, "get", token).then((res) =>
      res.json().then((res2) => {
        setPhone(res2);
        resetForm(res2);
      })
    );
  }, [phoneId, loadCurrentData]);

  const handleCancelEdit = () => {
    setIsEditMode(false);
    resetForm(phone);
  };

  const handleValidateEdit = () => {
    const phoneJson = JSON.stringify(phoneData);
    const formData = new FormData();

    formData.append("phone", phoneJson);
    formData.append("image", inputRef.current.files[0]);

    ApiHelper(`/phones/${phoneId}`, "put", token, formData, "").then(() => {
      setLoadData((prev) => !prev);
      setLoadCurrentData((prev) => !prev);
      setIsEditMode(false);
    });
  };

  const handleField = (e) => {
    setPhoneData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalAction = () => {
    ApiHelper(`/phones/${phoneId}`, "delete", token).then(() => {
      setLoadData((prev) => !prev);
      setIsDeleteModalOpen(false);
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {Object.keys(phone).length > 0 && (
        <div>
          {!isEditMode ? (
            <div>
              <DialogTitle>Fiche Téléphone</DialogTitle>
              <DialogContent>
                <img
                  style={{ maxWidth: "100%", maxHeight: "30vh" }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/phonePics/${
                    phone.image
                  }`}
                  alt={phone.image}
                />
                <DialogContentText>Marque : {phone.brand}</DialogContentText>
                <DialogContentText>Modèle : {phone.model}</DialogContentText>
                <DialogContentText>RAM : {phone.ram}</DialogContentText>
                <DialogContentText>Stockage : {phone.memory}</DialogContentText>
                <DialogContentText>
                  Taille d'écran : {phone.price}
                </DialogContentText>
                <DialogContentText>
                  Catégorie : {phone.category}
                </DialogContentText>
                <DialogContentText>Prix : {phone.price}</DialogContentText>
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
                title="Souhaitez-vous vraiment supprimer ce téléphone ?"
              />
            </div>
          ) : (
            <div>
              <DialogTitle>Editer un téléphone</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="brand"
                  name="brand"
                  label="Marque"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.brand}
                  onChange={handleField}
                  required
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="model"
                  name="model"
                  label="Modèle"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.model}
                  onChange={handleField}
                  required
                />
                <TextField
                  margin="dense"
                  id="ram"
                  name="ram"
                  label="RAM"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.ram}
                  onChange={handleField}
                  required
                />
                <TextField
                  margin="dense"
                  id="memory"
                  name="memory"
                  label="Stockage"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.memory}
                  onChange={handleField}
                  required
                />
                <TextField
                  margin="dense"
                  id="category"
                  name="category"
                  label="Catégorie"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.category}
                  onChange={handleField}
                  required
                />
                <TextField
                  margin="dense"
                  id="price"
                  name="price"
                  label="Prix"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.price}
                  onChange={handleField}
                  required
                />
                <TextField
                  margin="dense"
                  id="screen_size"
                  name="screen_size"
                  label="Taille d'écran"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={phoneData.screen_size}
                  onChange={handleField}
                  required
                />
                <div style={{ display: "flex" }}>
                  <Button variant="contained" component="label">
                    Uploader une image
                    <input
                      type="file"
                      ref={inputRef}
                      hidden
                      onChange={(e) => {
                        setImageName(e.target.value.split("\\")[2]);
                      }}
                    />
                  </Button>
                  <Typography variant="body1" color="initial">
                    {imageName}
                  </Typography>
                </div>
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
