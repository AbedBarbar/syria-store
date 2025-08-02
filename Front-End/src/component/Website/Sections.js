import React, { useState } from "react";
import Section from "./Section";
import cosmetics from "../../images/Dove.jpg";
import oils from "../../images/Oils2.jpg";
import herbs from "../../images/herbs.jpg";
import serums from "../../images/Serums2.jpg";

export default function Sections() {
    const [isHoveredTitle, setIsHovered] = useState(false);
    function handleTitleEnter(){
        setIsHovered(true);
        
    }
    function handleTitleLeave(){
        setIsHovered(false);
       
    }
  return (
    <div className="sections pb-[75px]">
      <h2 onMouseEnter={handleTitleEnter} onMouseLeave={handleTitleLeave}  className={`main-title uppercase mt-[0] mx-[auto] mb-[80px] border-[2px] border-[solid] border-[#6de96d] ${isHoveredTitle?"text-[white]":"text-[#6de96d]"} ${isHoveredTitle?"bg-[#6de96d]":""} px-[20px] py-[10px] text-[30px] w-[fit-content] transition-all duration-500 ease-in-out mt-[30px]`}>
        Sections
      </h2>
      <div className="container grid grid-cols-[repeat(auto-fill,_minmax(225px,_1fr))] gap-[40px]">
        <Section 
          title="Cosmetics"
          content="Mixtures of chemical compounds derived from either natural or
              synthetic sources. They are intended to be used on the human body
              to clean, beautify, enhance one's attractiveness or change one's
              appearance without affecting the body It can be used for skin
              care, cleaning and protection, general body care and many other
              uses."
          image={cosmetics}
          to="cosmetics"
        />
        <Section
          title="Oils"
          content="These rich, emollient formulas can help moisturize and soften the
              skin, nourish the skin's natural moisture barrier, and help
              address some skin concerns, such as dryness or dullness. Our skin
              naturally produces oils and lipids, which help prevent water loss
              from to keep it hydrated and elastic. Face oils help to keep your
              skin balanced and add an extra level of protection."
          image={oils}
          to="oils"
        />
        <Section
          title="Medicinal herbs"
          content="Products made from plants that are used to treat disease or
              maintain health Many prescription and over-the-counter medications
              are also made from botanical products, but these products contain
              only pure ingredients and are regulated by the Food and Drug
              Administration. Herbal supplements may contain whole plants or
              plant parts."
          image={herbs}
          to="herbs"
        />
        <Section
          title="Serums"
          content="A skincare product that you can apply to your skin after cleansing
              and before moisturizing with the goal of delivering powerful
              ingredients directly into the skin. The serum is particularly
              suitable for this task because it consists of smaller particles
              that can penetrate deeply into the skin and deliver a very high
              concentration of active ingredients."
          image={serums}
          to="serums"
        />
      </div>
    </div>
  );
}
