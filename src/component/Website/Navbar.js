import {
  faArrowLeft,
  faBars,
  faCartShopping,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import logo from "../../images/aaa.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowLog, toggleMenu, toggleRegistered } from "../../Redux/MenuSlice";
import PleaseLogin from "./PleaseLogin";


export default function Navbar(props) {
  const show = window.innerWidth < 576 ? false : true;
  const dispatch = useDispatch();
  const isRegistered = useSelector((state) => state.menu.registered);
  const nav=useNavigate()
  const [pleaseLogin, setPleaseLogin] = useState(false);
  
  function handelBack(){
    window.history.back();
  }
  function handleLogOut(){
    localStorage.removeItem('email');
    dispatch(toggleRegistered());
    localStorage.clear();
    nav("/")
    window.location.reload()
  }
  //const email=localStorage.getItem("email")
  function handleCart(e){
    e.preventDefault();
    if(isRegistered){
      setPleaseLogin(false)
      nav("/cart")
    }
    else{
      setPleaseLogin(false)
    }
    setTimeout(() => {
      setPleaseLogin(true); // Then show the PleaseLogin message again
    }, 0);
  }
  return (
    <div style={{ backgroundColor: "#202d57" }}>
      <nav
        className="h-16 px-[20px] w-full flex justify-center items-center text-white"
        style={{ backgroundColor: "#202d57" }}
      >
        <div className="container flex items-center justify-between h-full">
          <div className="flex " style={{ gap: "20px" }}>
            <button
              className="text-xl cursor-pointer"
              onClick={() => dispatch(toggleMenu())}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <a href="55" className="text-xl">
              <FontAwesomeIcon icon={faLanguage} />
            </a>
          </div>
          {show && (
            
              <Link to="/">
                <img src={logo} alt="" className="w-[150px]" />
              </Link>
          )}

          <div className="flex" style={{ gap: "20px" }}>
            {!isRegistered ? (
              <p
                className="bg-[white] text-[black] px-[25px] py-[5px] text-center rounded-[8px] cursor-pointer"
                onClick={() => dispatch(toggleShowLog())}
              >
                Login
              </p>
            ) : (
              <p
                onClick={handleLogOut}
                className="bg-[white] text-[black] px-[15px] py-[5px] text-center rounded-[8px] cursor-pointer"
              >
                Log Out
              </p>
            )}

            {!props.cart ? (
              <Link to="/cart" onClick={handleCart} className="text-xl">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
            ) : (
              <p className="text-xl bg-[white] px-[10px] text-[black] rounded-[5px] cursor-pointer" onClick={handelBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </p>
            )}
          </div>
        </div>
      </nav>
      {pleaseLogin && <PleaseLogin/>}
    </div>
  );
}
