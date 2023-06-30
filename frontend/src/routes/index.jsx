import React from "react";
import App from "../App";
import Login from "../pages/Login";
import PhoneList from "../pages/PhoneList";
import UserList from "../pages/UserList";
import Faq from "../pages/Faq";
import ErrorPage from "../pages/ErrorPage";

const Routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Faq />,
      },
      {
        path: "/phone-list",
        element: <PhoneList />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default Routes;
