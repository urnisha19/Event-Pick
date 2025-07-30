import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AdminManagement from "../Pages/AdminManagement";
import Profile from "../Pages/Profile";
import Events from "../Pages/Events";
import MyBookings from "../Pages/MyBookings";
import AddEvent from "../Pages/AddEvent";
import PrivateRoute from "./PrivateRoute";
import EditEvent from "../Pages/AddEvent/EditEvent";
import EventDetails from "../Pages/EventDetails";
import EventRegistration from "../Pages/EventRegistration";
import CategoryPage from "../Components/Home/CategoryPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage/>,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/events/:id/registration",
        element: (
          <PrivateRoute>
            <EventRegistration />
          </PrivateRoute>
        ),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/addEvent",
        element: (
          <PrivateRoute requiredRole="admin">
            <AddEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/addEvent/:id/edit",
        element: (
          <PrivateRoute requiredRole="admin">
            <EditEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminManagement",
        element: (
          <PrivateRoute requiredRole="admin">
            <AdminManagement />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
