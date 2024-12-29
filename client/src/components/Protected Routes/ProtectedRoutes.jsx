import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "../../contexts/Auth/authContext";
import { modalContext } from "../../contexts/Modal/modalContext";
import Loading from "../Loading/Loading";

function ProtectedRoute() {
  const { user, isLoading } = useContext(authContext);
  const { setOpenModal } = useContext(modalContext);

  useEffect(() => {
    if (!isLoading && !user) {
      setOpenModal("login");
    }
  }, [isLoading, user, setOpenModal]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
