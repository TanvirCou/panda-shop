/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingAnimation from "../components/Loader/LoadingAnimation";

const ProtectedRoute = ({ children }) => {
  const { loading, isShop } = useSelector((state) => state.shop);

  if (loading === true) {
    return (
      <LoadingAnimation />
    )
  } else {
    if (!isShop) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;