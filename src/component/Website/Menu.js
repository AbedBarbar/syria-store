import React, { useEffect, useRef } from "react";
import logo from "../../images/aaa.jpg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../Redux/MenuSlice";

export default function Menu() {

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.menu.isOpen);
  const menuRef = useRef();
  useEffect(() => {
    //Function to handle clicks outside the menu
    function handleClickOutside(event) {
      
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(toggleMenu());
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
     else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <>
      <div ref={menuRef}
        className={`text-[white] bg-[#202d57] w-[350px] absolute top-[0] ${
          isOpen ? "left-[400px]" : "left-[0px]"
        } p-[25px] -translate-x-[400px] [transition:all_0.5s_ease-in-out]`}
      >
        <div className="flex items-center justify-between">
          <div className="w-[150px]">
            <img src={logo} alt="" />
          </div>
          <div className="h-[40px]">
            <button
              className="w-[45px] h-[40px] rounded-[10px] cursor-pointer bg-[white] text-[#202d57] text-[20px]"
              onClick={() => dispatch(toggleMenu())}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
        </div>
        <div className="mt-[50px]">
          <div className="p-[15px] [box-shadow:-6px_8px_10px_1px_#535987,_6px_-8px_10px_1px_#535987] mb-[40px]">
            <div className="flex items-center pb-[5px]">
              <i className="fa-solid fa-location-dot"></i>
              <p className="ml-[5px]">Address</p>
            </div>
            <h4 className="mb-[5px]">Syria</h4>
          </div>
          <div className="p-[15px] [box-shadow:-6px_8px_10px_1px_#535987,_6px_-8px_10px_1px_#535987] mb-[40px]">
            <div className="flex items-center pb-[5px]">
              <i className="fa-solid fa-phone"></i>
              <p className="ml-[5px]">Phone</p>
            </div>
            <h4 className="mb-[5px]">+963933130000</h4>
          </div>
          <div className="p-[15px] [box-shadow:-6px_8px_10px_1px_#535987,_6px_-8px_10px_1px_#535987] mb-[40px]">
            <div className="flex items-center pb-[5px]">
              <i className="fa-solid fa-briefcase"></i>
              <p className="ml-[5px]">Work Day</p>
            </div>
            <h4 className="mb-[5px]">Sunday</h4>
            <h4 className="mb-[5px]">Monday</h4>
            <h4 className="mb-[5px]">Tuesday</h4>
            <h4 className="mb-[5px]">Wednesday</h4>
            <h4 className="mb-[5px]">Thursday</h4>
          </div>
          <div className="p-[15px] [box-shadow:-6px_8px_10px_1px_#535987,_6px_-8px_10px_1px_#535987] mb-[40px]">
            <div className="flex items-center pb-[5px]">
              <i className="fa-regular fa-clock"></i>
              <p className="ml-[5px]">Work hours</p>
            </div>
            <h4 className="mb-[5px]">Start Time: 08:00</h4>
            <h4 className="mb-[5px]">End Time: 23:59</h4>
          </div>
        </div>
      </div>
    </>
  );
}
