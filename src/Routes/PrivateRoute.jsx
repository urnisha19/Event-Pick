import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthProvider, AuthContext } from '../context/AuthContext'; 
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading, role } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return (
      <div className="text-center text-red-500 mt-10">
        ⛔ Access Denied: You are not authorized to view this page.
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
