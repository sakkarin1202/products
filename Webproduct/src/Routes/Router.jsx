import { createBrowserRouter } from "react-router-dom";
// import Home from "../page/Home.jsx";
import { lazy } from "react";

const Home = lazy(() => import("../page/Home.jsx"));
const Add = lazy(() => import("../page/Add.jsx"));
const Edit = lazy(() => import("../page/Edit.jsx"));
const Login = lazy(() => import("../page/Login.jsx"));
const Register = lazy(() => import("../page/Register.jsx"));
const Layout = lazy(() => import("../Component/Layout.jsx"));
const ModOrAdminPage = lazy(() => import("../page/ModOrAdminPage.jsx"));
const NotAllowed = lazy(() => import("../page/NotAllowed.jsx"));
const AdminPage = lazy(() => import("../page/AdminPage.jsx"));
const UserPage = lazy(() => import("../page/UserPage.jsx"));
const UserProfilePage = lazy(() => import("../page/UserProfilePage.jsx"));
const AdminLayout = lazy(() => import("../Component/AdminLayout.jsx"));

// import Add from "../page/Add.jsx";
// import Edit from "../page/Edit.jsx";
// import Login from "../page/Login.jsx";
// import Register from "../page/Register.jsx";
// import Layout from "../Component/Layout.jsx";
// import ModOrAdminPage from "../page/ModOrAdminPage.jsx";
// import NotAllowed from "../page/NotAllowed.jsx";
// import AdminPage from "../page/AdminPage.jsx";
// import UserPage from "../page/UserPage.jsx";
// import UserProfilePage from "../page/UserProfilePage.jsx";
// import AdminLayout from "../Component/AdminLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "add",
        element: (
          <ModOrAdminPage>
            <Add />,
          </ModOrAdminPage>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ModOrAdminPage>
            <Edit />
          </ModOrAdminPage>
        ),
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "userprofilepage",
        element: (
          <UserPage>
            <UserProfilePage />
          </UserPage>
        ),
      },
      {
        path: "notallowed",
        element: <NotAllowed />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "users",
        element: <div>dashboard</div>,
      },
    ],
  },
]);

export default router;
