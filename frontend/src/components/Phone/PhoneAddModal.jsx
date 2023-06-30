/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import ApiHelper from "../../services/ApiHelper";
import { useToken } from "../../context/TokenContext";

export default function PhoneAddModal({ open, handleClose, setLoadData }) {
  const { token } = useToken();

  const [imageName, setImageName] = useState("");

  const [phoneData, setPhoneData] = useState({
    brand: "",
    model: "",
    ram: "",
    memory: "",
    category: "",
    price: "",
    screen_size: "",
  });

  const inputRef = useRef();

  const handleField = (e) => {
    setPhoneData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setPhoneData({
      brand: "",
      model: "",
      ram: "",
      memory: "",
      category: "",
      price: "",
      screen_size: "",
    });
    setImageName("");
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const handleAdd = () => {
    const phone = JSON.stringify(phoneData);
    const formData = new FormData();

    formData.append("phone", phone);
    formData.append("image", inputRef.current.files[0]);

    ApiHelper("/phones", "post", token, formData, "").then(() => {
      setLoadData((prev) => !prev);
      resetForm();
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ajouter un nouveau téléphone</DialogTitle>
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
        <Button onClick={handleCancel}>Annuler</Button>
        <Button onClick={handleAdd}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}
