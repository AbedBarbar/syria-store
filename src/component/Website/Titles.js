import React from "react";
import { NavLink } from "react-router-dom";

export default function Titles() {
    const style="min-w-max mr-[15px] mb-[10px] bg-[#202d57] px-[40px] py-[10px] text-center rounded-[10px] border-[none] text-[white] text-[18px] no-underline cursor-pointer ";
    const activeStyle={
      backgroundColor:"#30a130",
    }
    
    return (
    <div className="container flex items-center justify-between h-full">
      <div  className="flex justify-between items-center w-full mt-[10px] overflow-x-auto">
        <NavLink to="/"    className={style} 
        //...activeStyle meaning: to enter to the variable and execute the css format inside it 
        style={({ isActive }) => (isActive ? {...activeStyle, width: "calc(95%/5)" } : {width: "calc(95%/5)" })}
        >
          Main
        </NavLink>
        <NavLink to="/cosmetics" style={({ isActive }) => (isActive ? {backgroundColor:"#30a130", width: "calc(95%/5)" } : {width: "calc(95%/5)" })} className={style}>Cosmetics</NavLink>
        <NavLink to="/oils" style={({ isActive }) => (isActive ? {...activeStyle, width: "calc(95%/5)" } : {width: "calc(95%/5)" })}  className={style}>Oils</NavLink>
        <NavLink to="/herbs" style={({ isActive }) => (isActive ? {...activeStyle, width: "calc(95%/5)" } : {width: "calc(95%/5)" })}  className={style}>Medicinal herbs</NavLink>
        <NavLink to="/serums" style={({ isActive }) => (isActive ? {...activeStyle, width: "calc(95%/5)" } : {width: "calc(95%/5)" })}  className={style}>Serums</NavLink>
      </div>
    </div>
  );
}
