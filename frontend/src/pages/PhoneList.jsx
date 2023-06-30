import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import ApiHelper from "../services/ApiHelper";
import PhoneModal from "../components/Phone/PhoneModal";
import { useToken } from "../context/TokenContext";
import PhoneAddModal from "../components/Phone/PhoneAddModal";

export default function PhoneList() {
  const { token } = useToken();
  let isAdmin = false;
  if (token) {
    const decodedToken = jwt_decode(token);
    isAdmin = decodedToken.user.isAdmin;
  }

  const [phones, setPhones] = useState([]);
  const [selectedPhoneId, setSelectedPhoneId] = useState(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    ApiHelper("/phones", "get", token).then((res) =>
      res.json().then((res2) => {
        setPhones(res2);
      })
    );
  }, [loadData]);

  const handleClickSee = (id) => {
    setSelectedPhoneId(id);
    setIsPhoneModalOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "brand",
      headerName: "Marque",
      width: 150,
      editable: false,
    },
    {
      field: "model",
      headerName: "Modèle",
      width: 150,
      editable: false,
    },
    {
      field: "ram",
      headerName: "RAM",
      width: 150,
      editable: false,
    },
    {
      field: "memory",
      headerName: "Stockage",
      width: 150,
      editable: false,
    },
    {
      field: "category",
      headerName: "Catégorie",
      width: 150,
      editable: false,
    },
    {
      field: "price",
      headerName: "Prix",
      width: 150,
      editable: false,
    },
    {
      field: "screen_size",
      headerName: "Taille d'écran",
      width: 150,
      editable: false,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="See"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleClickSee(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      {typeof phones === "object" ? (
        <div>
          {isAdmin === 1 && (
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsAddPhoneModalOpen(true)}
            >
              Ajouter un téléphone
            </Button>
          )}
          <DataGrid
            sx={{ height: "75vh", marginTop: "25px" }}
            rows={phones}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
          {selectedPhoneId !== null && (
            <PhoneModal
              phoneId={selectedPhoneId}
              open={isPhoneModalOpen}
              handleClose={() => setIsPhoneModalOpen(false)}
              setLoadData={setLoadData}
            />
          )}
          <PhoneAddModal
            open={isAddPhoneModalOpen}
            handleClose={() => setIsAddPhoneModalOpen(false)}
            setLoadData={setLoadData}
          />
        </div>
      ) : (
        <p>Accès non autorisé</p>
      )}
    </Box>
  );
}
