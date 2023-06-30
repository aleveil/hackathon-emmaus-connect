/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ApiHelper from "../../services/ApiHelper";
import { useToken } from "../../context/TokenContext";

export default function PhoneAddModal({ open, handleClose, setLoadData }) {
  const { token } = useToken();

  const [imageName, setImageName] = useState("");

  const [phoneData, setPhoneData] = useState({
    brand: "",
    model: "",
    screen_size: "",
  });

  const inputRef = useRef();

  const handleField = (e) => {
    setPhoneData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [ram, setRam] = useState("-");
  const [memory, setMemory] = useState("-");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const resetForm = () => {
    setPhoneData({
      brand: "",
      model: "",
      screen_size: "",
    });
    setRam("-");
    setMemory("-");
    setCategory("");
    setPrice("");
    setImageName("");
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const ramValues = [
    { ram: "-", valM: 0 },
    { ram: 1, valM: 30 },
    { ram: 2, valM: 40 },
    { ram: 3, valM: 54 },
    { ram: 4, valM: 72 },
    { ram: 6, valM: 108 },
    { ram: 8, valM: 144 },
    { ram: 12, valM: 216 },
    { ram: 16, valM: 288 },
  ];

  const memoryValues = [
    { memory: "-", valS: 0 },
    { memory: 16, valS: 31 },
    { memory: 32, valS: 45 },
    { memory: 64, valS: 65 },
    { memory: 128, valS: 95 },
    { memory: 256, valS: 137 },
    { memory: 512, valS: 199 },
    { memory: 1024, valS: 288 },
  ];

  const priceTable = [
    { valMin: 0, valMax: 45, price: "5€" },
    { valMin: 45, valMax: 90, price: "15€" },
    { valMin: 90, valMax: 130, price: "30€" },
    { valMin: 130, valMax: 165, price: "50€" },
    { valMin: 165, valMax: 215, price: "75€" },
    { valMin: 215, valMax: 255, price: "100€" },
    { valMin: 255, valMax: 315, price: "125€" },
    { valMin: 315, valMax: 375, price: "140€" },
    { valMin: 375, valMax: Infinity, price: "150€" },
  ];

  const handleChange = (event) => {
    if (event.target.value === "-") setRam(event.target.value);
    else setRam(Number(event.target.value));
  };

  const handleChangeMemory = (event) => {
    if (event.target.value === "-") setMemory(event.target.value);
    else setMemory(Number(event.target.value));
  };

  const categoryCalculator = (sum) => {
    if (sum >= 0 && sum < 90) return "1 – HC";
    if (sum >= 90 && sum < 165) return "2 – C";
    if (sum >= 165 && sum < 255) return "3 – B";
    if (sum >= 255 && sum < 375) return "4 – A";
    return "5 – Premium";
  };

  useEffect(() => {
    if (memory === "-" || ram === "-") return;
    const valS = memoryValues.find((value) => value.memory === memory)?.valS;
    const valM = ramValues.find((value) => value.ram === ram)?.valM || 0;
    const sum = valS + valM;
    setCategory(categoryCalculator(sum));

    const productValue = priceTable.find(
      (item) => sum >= item.valMin && sum <= item.valMax
    );

    setPrice(productValue.price);
  }, [ram, memory]);

  const handleAdd = () => {
    const phone = JSON.stringify({
      brand: phoneData.brand,
      model: phoneData.model,
      screen_size: phoneData.screen_size,
      ram,
      memory,
      category,
      price,
    });
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35,
            gap: 10,
          }}
        >
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
        <div style={{ display: "flex", marginTop: 35 }}>
          <FormControl style={{ width: "50%" }}>
            <InputLabel id="ram-select-label">RAM</InputLabel>
            <Select
              labelId="ram-select-label"
              id="ram-select"
              value={ram}
              label="RAM"
              onChange={handleChange}
            >
              {ramValues.map((value) => (
                <MenuItem key={value.ram} value={value.ram}>
                  {value.ram}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ margin: "30px" }} />
          <FormControl style={{ width: "50%" }}>
            <InputLabel id="memory-select-label">Memory</InputLabel>
            <Select
              labelId="memory-select-label"
              id="memory-select"
              value={memory}
              label="Stockage"
              onChange={handleChangeMemory}
            >
              {memoryValues.map((value) => (
                <MenuItem key={value.memory} value={value.memory}>
                  {value.memory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35,
            gap: 10,
          }}
        >
          {category && ram !== "-" && memory !== "-" && (
            <Typography variant="h6" color="initial">
              Catégorie : {category}
            </Typography>
          )}
          {price && ram !== "-" && memory !== "-" && (
            <Typography variant="h4" color="initial">
              Prix : {price}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Annuler</Button>
        <Button onClick={handleAdd}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
}
