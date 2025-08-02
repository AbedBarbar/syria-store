import React, { useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function Section(props) {
  const boxStyle =
    "[box-shadow:0_2px_15px_rgb(0_0_0_/_10%)] bg-[white] rounded-[10px] [transition:all_0.3s_ease-in-out]";
  const [HoveredSection, setHoveredSection] = useState(false);
  
  function toggleSection(){
    setHoveredSection(prev=>!prev)
  }
  return (
    <div
      onMouseEnter={toggleSection}
      onMouseLeave={toggleSection}
      className={` ${boxStyle} ${HoveredSection?"-translate-y-[10px]":""} `}
    >
      <div className="image h-[30%]">
        <img
          src={props.image}
          alt="Cosmetics"
          className="w-full h-full rounded-[10px] [aspect-ratio:1_/_0.8]"
        />
      </div>
      <div className="content text-[#202d57] p-[15px] h-[60%]">
        <h2>{props.title}</h2>
        <p className="mt-[10px] mx-[0] mb-[0] leading-normal text-[#777] text-[16px]">
          {props.content}
        </p>
      </div>
      <div className="info p-[20px] border-t-[1px_solid_#e6e6e7] flex justify-between items-center h-[10%]">
        <NavLink
          to={`/${props.to}`}
          className="border-[none] capitalize no-underline cursor-pointer"
        >
          View Products
        </NavLink>
        <NavLink
          to={`/${props.to}`}
          className="w-[25px] h-[25px] cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </NavLink>
      </div>
    </div>
  );
}
