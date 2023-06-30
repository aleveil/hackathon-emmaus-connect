/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
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
  let isAdmin = false;
  if (token) {
    const decodedToken = jwt_decode(token);
    isAdmin = decodedToken.user.isAdmin;
  }

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
    { valMin: 0, valMax: 45, price: 5 },
    { valMin: 45, valMax: 90, price: 15 },
    { valMin: 90, valMax: 130, price: 30 },
    { valMin: 130, valMax: 165, price: 50 },
    { valMin: 165, valMax: 215, price: 75 },
    { valMin: 215, valMax: 255, price: 100 },
    { valMin: 255, valMax: 315, price: 125 },
    { valMin: 315, valMax: 375, price: 140 },
    { valMin: 375, valMax: Infinity, price: 150 },
  ];

  const weightingValues = [
    { label: "Neuf", value: 10 },
    { label: "Très bon état", value: 5 },
    { label: "Reconditionné", value: 0 },
    { label: "Reconditionnable", value: -5 },
    { label: "Bloqué", value: -10 },
    { label: "Réparable", value: -50 },
    { label: "DEEE", value: -100 },
  ];

  const [weighting, setWeighting] = useState(0);

  const categoryCalculator = (sum) => {
    if (sum >= 0 && sum < 90) return "1 – HC";
    if (sum >= 90 && sum < 165) return "2 – C";
    if (sum >= 165 && sum < 255) return "3 – B";
    if (sum >= 255 && sum < 375) return "4 – A";
    return "5 – Premium";
  };

  useEffect(() => {
    if (
      Object.keys(phoneData).length <= 0 ||
      phoneData.memory === "-" ||
      phoneData.ram === "-"
    )
      return;

    const valS = memoryValues.find(
      (value) => value.memory === parseInt(phoneData.memory, 10)
    )?.valS;
    const valM =
      ramValues.find((value) => value.ram === parseInt(phoneData.ram, 10))
        ?.valM || 0;
    const sum = valS + valM;
    const productValue = priceTable.find(
      (item) => sum >= item.valMin && sum <= item.valMax
    );
    setPhoneData({
      ...phoneData,
      category: categoryCalculator(sum),
      price: productValue.price,
    });
  }, [phoneData.ram, phoneData.memory]);

  return (
    <Dialog open={open} onClose={handleClose}>
      {Object.keys(phone).length > 0 && (
        <div>
          {!isEditMode ? (
            <div style={{ textAlign: "center" }}>
              <DialogTitle variant="h4">
                {phone.brand} {phone.model}
              </DialogTitle>
              <DialogContent
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <img
                  style={{ maxWidth: "100%", maxHeight: "30vh" }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/phonePics/${
                    phone.image
                  }`}
                  alt={phone.image}
                />
                <DialogContentText>RAM : {phone.ram}</DialogContentText>
                <DialogContentText>Stockage : {phone.memory}</DialogContentText>
                <DialogContentText>
                  Taille d'écran : {phone.price}
                </DialogContentText>
                <DialogContentText>
                  Catégorie : {phone.category}
                </DialogContentText>
                <FormControl style={{ width: "50%", marginTop: 20 }}>
                  <InputLabel id="weighting-select-label">
                    Pondération
                  </InputLabel>
                  <Select
                    labelId="weighting-select-label"
                    id="weighting-select"
                    value={weighting}
                    name="weighting"
                    label="Pondération"
                    onChange={(e) => setWeighting(e.target.value)}
                  >
                    {weightingValues.map((value) => (
                      <MenuItem key={value.value} value={value.value}>
                        {`${value.label} (${value.value > 0 ? "+" : ""}${
                          value.value
                        }%)`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    gap: 10,
                  }}
                >
                  <Typography variant="h4" color="initial">
                    Prix :{" "}
                    {parseInt(phone.price, 10) +
                      weighting * (parseInt(phone.price, 10) / 100)}
                    €
                  </Typography>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Retour</Button>
                {isAdmin === 1 && (
                  <Button onClick={() => setIsEditMode(true)}>Editer</Button>
                )}
                {isAdmin === 1 && (
                  <Button onClick={handleOpenDeleteModal}>Supprimer</Button>
                )}
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
                      value={phoneData.ram}
                      name="ram"
                      label="RAM"
                      onChange={handleField}
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
                      value={phoneData.memory}
                      name="memory"
                      label="Stockage"
                      onChange={handleField}
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
                  {phoneData.category &&
                    phoneData.ram !== "-" &&
                    phoneData.memory !== "-" && (
                      <Typography variant="h6" color="initial">
                        Catégorie : {phoneData.category}
                      </Typography>
                    )}
                  {phoneData.price &&
                    phoneData.ram !== "-" &&
                    phoneData.memory !== "-" && (
                      <Typography variant="h4" color="initial">
                        Prix : {phoneData.price} €
                      </Typography>
                    )}
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
