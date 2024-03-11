/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.user);

  if (isLoading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    } else if (user?.user.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;