import React, { useEffect, useState } from "react";
import logo from "../../images/Dove.jpg";


export default function Card2(props) {
  const [isHoverdPos, setIsHoveredPos] = useState(false);
  const [isHoverdNeg, setIsHoveredNeg] = useState(false);
  
  const initialCountBuy = () => {
    const savedCountBuy = localStorage.getItem(`countBuy_${props.id}`);
    return savedCountBuy ? parseInt(savedCountBuy, 10) : 0;
  };
  const [countBuy, setCountBuy] = useState(initialCountBuy);
  
  useEffect(() => {
    localStorage.setItem(`countBuy_${props.id}`, countBuy);
    props.onProductUpdate(props.id, countBuy);
  }, [countBuy]);


  function handleHoverNeg() {
    setIsHoveredNeg((prevState) => !prevState);
  }
  function handleHoverPos() {
    setIsHoveredPos((prevState) => !prevState);
  }

  function handleIncrease() {
    setCountBuy((prev) => prev + 1);
    const totalPrice = parseInt(window.localStorage.getItem("totalPrice"));
    window.localStorage.setItem(
      "totalPrice",
      totalPrice + parseInt(props.price)
    );

    window.dispatchEvent(new Event("storage"));
  }

  function handleDecrease() {
    
    if (countBuy === 1) {
      const amount = parseInt(window.localStorage.getItem("amount") || 0);
      window.localStorage.setItem("amount", amount - 1);
      
      setIsHoveredNeg((prevState) => !prevState);
      localStorage.setItem(`countBuy_${props.id}`,0)
      window.location.reload();
    }
    if (countBuy > 1){
      
      setCountBuy((prev) => --prev);
    }
    const totalPrice = parseInt(window.localStorage.getItem("totalPrice"));
    window.localStorage.setItem(
      "totalPrice",
      totalPrice - parseInt(props.price)
    );

    window.dispatchEvent(new Event("storage"));
  }

  return (
    <>
      {countBuy>0 && (
        <div>
          <div className="relative mb-[20px]">
            <img src={logo} className="rounded-[30px]" alt="" />
            <div className="left-[14%] w-3/4 absolute -bottom-[18px] flex justify-center items-center right-[40%] rounded-[15px] bg-[white]">
              <p
                className={`w-[45px] h-[45px] [transition:ease-in-out_0.3s_all] text-[25px] flex justify-center items-center rounded-[10px] cursor-pointer ${
                  isHoverdPos
                    ? "bg-[black] text-[white]"
                    : "bg-[white] text-[black]"
                }`}
                onMouseEnter={handleHoverPos}
                onMouseLeave={handleHoverPos}
                onClick={handleIncrease}
              >
                +
              </p>
              <span
                className={`w-[45px]  h-[45px] [transition:ease-in-out_0.3s_all] bg-[white] text-[18px] flex justify-center items-center rounded-[10px] cursor-pointer`}
              >
                {props.count}
              </span>
              <p
                className={`w-[45px] h-[45px] [transition:ease-in-out_0.3s_all] text-[25px] flex justify-center items-center rounded-[10px] cursor-pointer ${
                  isHoverdNeg
                    ? "bg-[black] text-[white]"
                    : "bg-[white] text-[black]"
                }`}
                onMouseEnter={handleHoverNeg}
                onMouseLeave={handleHoverNeg}
                onClick={handleDecrease}
              >
                -
              </p>
            </div>
          </div>
          <h2 className="text-[15px] font-bold">{props.name}</h2>
          <p>{props.price}$</p>
        </div>
      )}
    </>
  );
}
