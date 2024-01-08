import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import ActivationPage from "./pages/ActivationPage/ActivationPage";
import { ToastContainer, toast} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/features/userSlice";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import BestSelling from "./pages/BestSelling/BestSelling";
import Events from "./pages/Events/Events";
import FAQ from "./pages/FAQ/FAQ";

function App() {
  const {user} = useSelector(state => state.user);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  // useEffect(() => {
  //  const getUser = async() => {
  //   try {
  //     const res = await axios.get("http://localhost:3000/api/user/get", {withCredentials: true});
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
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/products" element={<Products/>} /> 
        <Route path="/best-selling" element={<BestSelling/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/faq" element={<FAQ/>} />   
        <Route path="/auth" element={<Auth />} />
        <Route path="/activation/:token" element={<ActivationPage />} />
      </Routes>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </BrowserRouter>
  )
}

export default App
