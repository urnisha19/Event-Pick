import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Routes/Router.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>
);
