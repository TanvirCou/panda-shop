import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AiChatbot from "./components/AiChatbot/AiChatbot";
import ActivationPage from "./pages/ActivationPage/ActivationPage";
import AdminAllEvents from "./pages/Admin/AdminAllEvents";
import AdminAllOrders from "./pages/Admin/AdminAllOrders";
import AdminAllProducts from "./pages/Admin/AdminAllProducts";
import AdminAllShops from "./pages/Admin/AdminAllShops";
import AdminAllUsers from "./pages/Admin/AdminAllUsers";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminWithdrawRequest from "./pages/Admin/AdminWithdrawRequest";
import AISearchPage from "./pages/AISearchPage/AISearchPage";
import Auth from "./pages/Auth/Auth";
import BestSelling from "./pages/BestSelling/BestSelling";
import Checkout from "./pages/Checkout/Checkout";
import Events from "./pages/Events/Events";
import FAQ from "./pages/FAQ/FAQ";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import Home from "./pages/Home/Home";
import ProductInformation from "./pages/ProductInformation/ProductInformation";
import Products from "./pages/Products/Products";
import OrderDetails from "./pages/Profile/OrderDetails";
import Profile from "./pages/Profile/Profile";
import TrackOrder from "./pages/Profile/TrackOrder";
import ShopActivationPage from "./pages/ShopActivationPage/ShopActivationPage";
import ShopAuth from "./pages/ShopAuth/ShopAuth";
import DashboardAllEvents from "./pages/ShopDashboard/DashboardAllEvents";
import DashboardAllOrders from "./pages/ShopDashboard/DashboardAllOrders";
import DashboardAllProducts from "./pages/ShopDashboard/DashboardAllProducts";
import DashboardCouponCode from "./pages/ShopDashboard/DashboardCouponCode";
import DashboardCreateEvent from "./pages/ShopDashboard/DashboardCreateEvent";
import DashboardCreateProduct from "./pages/ShopDashboard/DashboardCreateProduct";
import DashboardRefunds from "./pages/ShopDashboard/DashboardRefunds";
import DashboardSettings from "./pages/ShopDashboard/DashboardSettings";
import DashboardWithdraw from "./pages/ShopDashboard/DashboardWithdraw";
import ShopDashboard from "./pages/ShopDashboard/ShopDashboard";
import ShopOrderDetails from "./pages/ShopDashboard/ShopOrderDetails";
import ShopForgotPassword from "./pages/ShopForgotPassword/ShopForgotPassword";
import ShopResetPassword from "./pages/ShopForgotPassword/ShopResetPassword";
import ShopHome from "./pages/ShopHome/ShopHome";
import { fetchAllEvent } from "./redux/features/eventSlice";
import { fetchAllProduct } from "./redux/features/productSlice";
import { fetchShop } from "./redux/features/shopSlice";
import { fetchUser } from "./redux/features/userSlice";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProtectedShopRoute from "./Routes/ProtectedShopRoute";

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const res = await axios.get(
      "https://panda-shop-server-v4.up.railway.app/api/payment/stripe-api-key"
    );
    setStripeApiKey(res.data.stripeApiKey);
  };

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchShop());
    dispatch(fetchAllProduct());
    dispatch(fetchAllEvent());
    getStripeApiKey();
  }, []);

  // useEffect(() => {
  //   dispatch(fetchAllProduct());
  // }, [recall, setRecall, dispatch])

  // useEffect(() => {
  //  const getUser = async() => {
  //   try {
  //     const res = await axios.get("https://panda-shop-server-v4.up.railway.app/api/user/get", {withCredentials: true});
  //     toast.success(res.data.message);
  //   } catch(err) {
  //     console.log(err);
  //     toast.error(err.response.data.message);
  //   }
  //  }
  //  getUser();
  // }, [])

  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path='/checkout'
              element={
                <ProtectedRoute>
                  {" "}
                  <Checkout />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductInformation />} />
        <Route path='/best-selling' element={<BestSelling />} />
        <Route path='/events' element={<Events />} />
        <Route path='/ai-assistant' element={<AISearchPage />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/activation/:token' element={<ActivationPage />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              {" "}
              <Profile />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/order/:id'
          element={
            <ProtectedRoute>
              {" "}
              <OrderDetails />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/track-order/:id'
          element={
            <ProtectedRoute>
              {" "}
              <TrackOrder />{" "}
            </ProtectedRoute>
          }
        />

        <Route path='/shop-auth' element={<ShopAuth />} />
        <Route path='/shop/forgot-password' element={<ShopForgotPassword />} />
        <Route
          path='/shop/reset-password/:token'
          element={<ShopResetPassword />}
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/shop/:id' element={<ShopHome />} />
        <Route
          path='/shop/dashboard'
          element={
            <ProtectedShopRoute>
              {" "}
              <ShopDashboard />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/all-orders'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardAllOrders />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/order/:id'
          element={
            <ProtectedShopRoute>
              {" "}
              <ShopOrderDetails />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/all-products'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardAllProducts />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/create-product'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardCreateProduct />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/create-event'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardCreateEvent />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/all-events'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardAllEvents />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/coupon-code'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardCouponCode />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/withdraw-money'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardWithdraw />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/dashboard/refund-order'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardRefunds />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop/settings'
          element={
            <ProtectedShopRoute>
              {" "}
              <DashboardSettings />{" "}
            </ProtectedShopRoute>
          }
        />
        <Route
          path='/shop-activation/:token'
          element={<ShopActivationPage />}
        />

        <Route
          path='/admin/dashboard'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminDashboard />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/dashboard/all-orders'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminAllOrders />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/dashboard/all-shops'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminAllShops />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/dashboard/all-users'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminAllUsers />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/dashboard/all-products'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminAllProducts />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/dashboard/all-events'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminAllEvents />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/dashboard/withdraw-request'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminWithdrawRequest />{" "}
            </ProtectedAdminRoute>
          }
        />
        <Route
          path='/admin/settings'
          element={
            <ProtectedAdminRoute>
              {" "}
              <AdminSettings />{" "}
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <AiChatbot />
    </BrowserRouter>
  );
}

export default App;
