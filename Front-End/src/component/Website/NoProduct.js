import React from "react";
import noProduct from "../../images/noProduct.png";

export default function NoProduct() {
  return (
    <div className="text-center text-[25px] mt-[80px]">
      <img src={noProduct} alt="" className="w-[30%] mt-0 mx-[auto] mb-[20px] block" />
      No products have been added to the cart yet
    </div>
  );
}
