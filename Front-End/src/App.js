import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Website/Home";
import Cosmetics from "./component/Website/Cosmetics";
import Oils from "./component/Website/Oils";
import Herbs from "./component/Website/Herbs";
import Serums from "./component/Website/Serums";
import ScrollToTop from "./component/Website/ScrollToTop";
import Cart from "./component/Website/Cart";

import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import { useSelector } from "react-redux";
import Dashboard from "./component/Dashboard/Dashboard";
import ImageUpload from "./component/Website/try";
import AddProduct from "./component/Dashboard/AddProduct";
import Products from "./component/Dashboard/Products";
import Users from "./component/Dashboard/Users";
import AddUser from "./component/Dashboard/AddUser";
import LoginDashboard from "./component/Dashboard/LoginDashboard";
import DashboardHome from "./component/Dashboard/DashboardHome";

function App() {
  // const isRegistered = window.localStorage.getItem("registered");
  const accountState = useSelector((state) => state.menu.accountState);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/oils" element={<Oils />} />
          <Route path="/herbs" element={<Herbs />} />
          <Route path="/serums" element={<Serums />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/try" element={<ImageUpload />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="Home" element={<DashboardHome />} />
            <Route path="Products" element={<Products />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="Users" element={<Users />} />
            <Route path="AddUser" element={<AddUser />} />
            <Route path="SignIn" element={<LoginDashboard />} />
          </Route>
        </Route>
      </Routes>
      {accountState === "Login" ? <Login /> : <Register />}
    </BrowserRouter>
  );
}

export default App;
