import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isShop } = useSelector((state) => state.shop);
  
  if (loading === false) {
    if (!isShop) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;