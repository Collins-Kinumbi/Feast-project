import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../../contexts/Auth/authContext";

function ProtectedRoute() {
  const { user, isLoading } = useContext(authContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    alert("Please login!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
