/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.user);

  if (isLoading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    // Admins should not access user profile — redirect to admin dashboard
    if (user?.user?.role === "Admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;