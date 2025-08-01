import React from "react";
import herbs from "../../images/a.jpg";

export default function Landing() {
  const show = window.innerWidth > 767 ? true : false;
  
  return (
    <div className="landing" style={{ height: "calc(100vh - 130px)" }}>
      {show ? (
        <div className="container border-b-[solid] border-b-[1px] border-b-[#30a130] flex justify-between items-center h-full">
          <div className="image w-[40%]">
            <img
              src={herbs}
              alt=""
              className="w-full [aspect-ratio:1_/_1] rounded-[50%]"
            />
          </div>
          <div className="cont w-[58%]">
            <p className="text-[#202d57] text-[25px] italic">
              Mediterranean aromatic medicinal herbs rich in active compounds,
              carefully collected, dried in the shade and sterilized according
              to the most up update methods. Genus, species and medical parts
              were identical to scientific pharmacopoeia.
            </p>
          </div>
        </div>
      ) : (
        <div className="container border-b-[solid_1px_#30a130] flex justify-center flex-col items-center h-full">
          <div className="image w-[70%] mb-[10px]">
            <img
              src={herbs}
              alt=""
              className="w-full [aspect-ratio:1_/_1] rounded-[50%]"
            />
          </div>
          <div className="cont w-[70%]">
            <p className="text-[#202d57] text-[25px] italic">
              Mediterranean aromatic medicinal herbs rich in active compounds,
              carefully collected, dried in the shade and sterilized according
              to the most up update methods. Genus, species and medical parts
              were identical to scientific pharmacopoeia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
