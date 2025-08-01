import React, { useEffect, useRef } from "react";

export default function ProductInfo(props) {
  const ref = useRef();
  const responsive = window.innerWidth > 768 ? true : false;
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleExit();
      }
    }
    if (props.show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleExit() {
    props.setShow(!props.show);
  }

  return (
    <>
      {props.show && (
        <div
          ref={ref}
          style={{ zIndex: 1 }}
          className={`bg-[#202d57] text-[white] fixed w-[55%] p-[10px] rounded-[15px] ${
            responsive ? "" : "flex-col"
          } flex gap-[25px] left-[20%] top-[25%] transition-all duration-5000 ease-in-out `}
        >
          {responsive ?
          (
            <div className="w-[30%]">
              <img
                src={props.logo}
                alt=""
                className="w-[100%] rounded-[10px]"
              />
            </div>
          ):""}
          <div className={`${responsive?"w-[70%]":"w-full"}`}>
            <h1
              className={`text-[#30a130] ${
                responsive ? "text-[23px]" : "text-[16px]"
              } `}
            >
              {props.name}
            </h1>
            <h2 className={`${responsive?"text-[20px]":"text-[15px]"} mb-[5px]`}>{props.price}$</h2>
            <p className={`${responsive?"text-[16px]":"text-[12px]"} w-[100%]`}>{props.benefits}</p>
          </div>
          <span
            onClick={() => handleExit()}
            className={`absolute top-[0] right-[0] ${responsive?"w-[45px] h-[45px] rounded-bl-[20px] text-[2em]":"w-[25px] h-[25px] rounded-bl-[10px] text-[16px]"}  bg-[#ffffffc7] text-[black]  flex justify-center items-center rounded-bl-[20px] rounded-tr-[15px] cursor-pointer`}
          >
            x
          </span>
        </div>
      )}
    </>
  );
}
