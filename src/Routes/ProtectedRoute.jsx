import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);
  
  if (isLoading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;