import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PleaseLogin from "./PleaseLogin";

export default function BuyDetails(props) {
  const laptopMenu = window.innerWidth > 576;
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const isRegistered = window.localStorage.getItem("registered");
  const [pleaseLogin, setPleaseLogin] = useState(false);
  const nav=useNavigate();
  useEffect(() => {
    const Total = window.localStorage.getItem("totalPrice");
    const count = window.localStorage.getItem("amount");
    if (Total) {
      setTotalPrice(parseInt(Total, 10));
    }
    if (count) {
      setAmount(parseInt(count, 10));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const item = window.localStorage.getItem("totalPrice");
      const item2 = window.localStorage.getItem("amount");
      if (item) {
        setTotalPrice(parseInt(item, 10));
      }
      if (item2) {
        setAmount(parseInt(item2, 10));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleCompleteCart(e){
    e.preventDefault();
    if (isRegistered) {
      setPleaseLogin(false)
      nav("/cart")
    }
    else{
      setPleaseLogin(false);// Reset the state first
      setTimeout(() => {
        setPleaseLogin(true); // Then show the PleaseLogin message again
      }, 0);
    }
    
  }
  return (
    <>
      {laptopMenu && (
        <div className="laptop-menu fixed bottom-[10px] w-full">
          <div className="container h-[55px] w-[85%] bg-[#202d57] !p-[0px] flex justify-between  rounded-[20px]">
            <div className="btn">
              {props.state === "Cart" ? (
                <Link className="flex justify-center items-center h-full px-[20px] py-0 bg-[#30a130] text-[white] rounded-[20px] w-[200px] no-underline cursor-pointer">
                  Click to Complete Order
                </Link>
              ) : (
                <Link to="/cart" onClick={handleCompleteCart} className="flex justify-center items-center h-full px-[20px] py-0 bg-[#30a130] text-[white] rounded-[20px] w-[200px] no-underline cursor-pointer">
                  Click to Complete Cart
                </Link>
              )}
            </div>
            <div className="content flex justify-between items-center font-bold text-center px-0 py-[10px] text-[white]">
              <div className="price">
                <p>Total price</p>
                <p>
                  <span>{totalPrice}</span> SP
                </p>
              </div>
              <div className="pl-[40px] pr-[20px] py-[10px]">
                <p>Amount</p>
                <span>{amount}</span>
              </div>
            </div>
          </div>
          
        </div>
      )}
      {pleaseLogin?<PleaseLogin key={Date.now()}/>:""}
    </>
  );
}
