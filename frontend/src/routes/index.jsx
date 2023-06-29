import React from "react";
import App from "../App";
import Login from "../pages/Login";
import AddPhone from "../pages/AddPhone";
import PhoneList from "../pages/PhoneList";
import UserList from "../pages/UserList";
import Faq from "../pages/Faq";
import ErrorPage from "../pages/ErrorPage";
import DataGridUserMenu from "../components/User/DataGridUserMenu";

const Routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/add-phone",
        element: <AddPhone />,
      },
      {
        path: "/phone-list",
        element: <PhoneList />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/test",
        element: <DataGridUserMenu />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default Routes;
