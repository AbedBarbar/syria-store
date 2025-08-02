import React, { useEffect, useState } from "react";
import NoProduct from "./NoProduct";
import Navbar from "./Navbar";
import WithProduct from "./WithProduct";
import BuyDetails from "./BuyDetails";
import Menu from "./Menu";


export default function Cart() {
  const [exist, setExist] = useState(false);

  const checkAmount = () => {
    const amount = window.localStorage.getItem("amount");
    setExist(amount > 0);
  };
  console.log("with");
  useEffect(() => {
    checkAmount();

    const handleStorageChange = () => {
      checkAmount();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Navbar cart={true} />
      <div className="container">
        {exist ? <WithProduct /> : <NoProduct />}
      </div>
      <BuyDetails state="Cart" />
      <Menu/>
    </div>
  );
}
