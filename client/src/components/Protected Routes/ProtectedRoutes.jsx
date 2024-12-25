import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../../contexts/Auth/authContext";
import { modalContext } from "../../contexts/Modal/modalContext";

function ProtectedRoute() {
  const { user, isLoading } = useContext(authContext);
  const { setOpenModal } = useContext(modalContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // alert("Please login!");
    setOpenModal("login");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
