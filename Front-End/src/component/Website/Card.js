import React, { useEffect, useState } from "react";
import logo from "../../images/Dove.jpg";
import ProductInfo from "./ProductInfo";
import PleaseLogin from "./PleaseLogin";

export default function Card(props) {
  const [isHover, setIsHover] = useState(false);
  const [isHoverPositive, setIsHoverPositive] = useState(false);
  const [isHoverNegative, setIsHoverNegative] = useState(false);

  const initialCountBuy = () => {
    const savedCountBuy = localStorage.getItem(`countBuy_${props.id}`);

    return savedCountBuy ? parseInt(savedCountBuy, 10) : 0;
  };
  const [countBuy, setCountBuy] = useState(initialCountBuy);
  const isRegistered = window.localStorage.getItem("registered");
  const [pleaseLogin, setPleaseLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem(`countBuy_${props.id}`, countBuy);
  }, [countBuy, props.id]);

  function handleHover() {
    setIsHover((prevState) => !prevState);
  }
  function handleHoverNegative() {
    setIsHoverNegative((prevState) => !prevState);
  }
  function handleHoverPositive() {
    setIsHoverPositive((prevState) => !prevState);
  }
  function handleBuy() {
    if (isRegistered) {
      setCountBuy((prev) => ++prev);
      setIsHover((prevState) => !prevState);
      setPleaseLogin(false);
      const totalPrice = parseInt(
        window.localStorage.getItem("totalPrice") || 0
      );
      window.localStorage.setItem(
        "totalPrice",
        totalPrice + parseInt(props.price)
      );

      const amount = parseInt(window.localStorage.getItem("amount") || 0);
      window.localStorage.setItem("amount", amount + 1);

      window.localStorage.setItem(`productName_${props.id}`, props.name);
      window.localStorage.setItem(`productPrice_${props.id}`, props.price);

      // Trigger custom event to update localStorage
      window.dispatchEvent(new Event("storage"));
    } else {
      setPleaseLogin(false); // Reset the state first
      setTimeout(() => {
        setPleaseLogin(true); // Then show the PleaseLogin message again
      }, 0);
    }
  }
  function handleIncrease() {
    setCountBuy((prev) => ++prev);

    const totalPrice = parseInt(window.localStorage.getItem("totalPrice"));
    window.localStorage.setItem(
      "totalPrice",
      totalPrice + parseInt(props.price)
    );

    // Trigger custom event to update localStorage
    window.dispatchEvent(new Event("storage"));
  }
  function handleDecrease() {
    if (countBuy === 1) {
      const amount = parseInt(window.localStorage.getItem("amount") || 0);
      window.localStorage.setItem("amount", amount - 1);
      setIsHoverNegative((prevState) => !prevState);
    }
    if (countBuy !== 0) setCountBuy((prev) => --prev);

    const totalPrice = parseInt(window.localStorage.getItem("totalPrice"));
    window.localStorage.setItem(
      "totalPrice",
      totalPrice - parseInt(props.price)
    );

    // Trigger custom event to update localStorage
    window.dispatchEvent(new Event("storage"));
  }
  const [is, setIs] = useState(false);
  function handleInfo() {
    setIs(!is);
  }
 

 
  return (
    <div>
      <div className="relative mb-[20px]">
        <img
          src={logo}
          alt=""
          className="rounded-[30px] cursor-pointer"
          onClick={handleInfo}
        />

        {countBuy === 0 ? (
          <p
            className={`w-[45px] h-[45px] [transition:ease-in-out_0.3s_all]  text-[25px] flex justify-center item-center rounded-[10px] items-center absolute -bottom-[15px] left-[35%]  cursor-pointer ${
              isHover ? "bg-[black] text-[white]" : "bg-[white] text-[black]"
            }`}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            onClick={handleBuy}
          >
            +
          </p>
        ) : (
          <div className="left-[14%] w-3/4 absolute -bottom-[18px] flex justify-center items-center right-[40%] rounded-[15px] bg-[white]">
            <p
              className={`w-[45px] h-[45px] [transition:ease-in-out_0.3s_all] text-[25px] flex justify-center items-center rounded-[10px]    cursor-pointer ${
                isHoverPositive
                  ? "bg-[black] text-[white]"
                  : "bg-[white] text-[black]"
              }`}
              onMouseEnter={handleHoverPositive}
              onMouseLeave={handleHoverPositive}
              onClick={handleIncrease}
            >
              +
            </p>
            <span
              className={`w-[45px]  h-[45px] [transition:ease-in-out_0.3s_all] bg-[white] text-[18px] flex justify-center items-center rounded-[10px]    cursor-pointer 
                
              `}
            >
              {countBuy}
            </span>
            <p
              className={`w-[45px] h-[45px] [transition:ease-in-out_0.3s_all]  text-[25px] flex justify-center items-center rounded-[10px]   cursor-pointer ${
                isHoverNegative
                  ? "bg-[black] text-[white]"
                  : "bg-[white] text-[black]"
              }`}
              onMouseEnter={handleHoverNegative}
              onMouseLeave={handleHoverNegative}
              onClick={handleDecrease}
            >
              -
            </p>
          </div>
        )}
      </div>
      <h2 className="text-[15px] font-bold">{props.name}</h2>
      <p>{props.price}$</p>
      <div className="transition-all ease-in-out duration-5000">
        {is && (
          <ProductInfo
            logo={logo}
            show={is}
            setShow={setIs}
            name={props.name}
            price={props.price}
            benefits={props.benefits}
          />
        )}
      </div>
      {pleaseLogin ? <PleaseLogin /> : ""}
    </div>
  );
}
