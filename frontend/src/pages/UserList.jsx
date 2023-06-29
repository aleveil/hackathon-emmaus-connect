import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import ApiHelper from "../services/ApiHelper";
import UserModal from "../components/User/UserModal";
import UserAddModal from "../components/User/UserAddModal";
import { useToken } from "../context/TokenContext";

export default function UserList() {
  const { token } = useToken();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    ApiHelper("/users", "get", token).then((res) =>
      res.json().then((res2) => {
        setUsers(res2);
      })
    );
  }, [loadData]);

  const handleClickSee = (id) => {
    setSelectedUserId(id);
    setIsUserModalOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nom",
      width: 150,
      editable: false,
    },
    {
      field: "username",
      headerName: "Identifiant",
      width: 150,
      editable: false,
    },
    {
      field: "isAdmin",
      headerName: "Administrateur",
      type: "number",
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
    <Box sx={{ height: 400, width: "100%" }}>
      {typeof users === "object" && users.length > 0 ? (
        <div>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddUserModalOpen(true)}
          >
            Ajouter un utilisateur
          </Button>
          <DataGrid
            rows={users}
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
          {selectedUserId !== null && (
            <UserModal
              userId={selectedUserId}
              open={isUserModalOpen}
              handleClose={() => setIsUserModalOpen(false)}
              setLoadData={setLoadData}
            />
          )}
          <UserAddModal
            open={isAddUserModalOpen}
            handleClose={() => setIsAddUserModalOpen(false)}
            setLoadData={setLoadData}
          />
        </div>
      ) : (
        <p>Accès non autorisé</p>
      )}
    </Box>
  );
}
