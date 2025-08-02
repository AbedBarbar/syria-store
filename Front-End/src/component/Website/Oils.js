import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Titles from "./Titles";
import Card from "./Card";
import BuyDetails from "./BuyDetails";
import Menu from "./Menu";

import axios from "axios";


export default function Cosmetics() {
  const [products, setProducts] = useState([]);
 
  // useEffect(() => {
  //   axios.get("/test.json")
  //     .then((data) => setProducts(data.data))
  //     .catch((error) => console.error("Error fetching the data:", error));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost/api/index.php")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("There was an error fetching the users!", error)
      );
  }, []);
  
  
  return (
    <div>
      <Navbar />
      <Titles />
      <div className="container products mt-[10px] pb-[50px] h-[fit-content] gap-y-[25px] grid grid-cols-[calc(90%/6)_calc(90%/6)_calc(90%/6)_calc(90%/6)_calc(90%/6)_calc(90%/6)] gap-x-[calc(10%/6)] w-full">
        {products.map(
          (product, index) =>
            product.Type === "oil" && (
              <Card
                key={index}
                id={index}
                name={product.name}
                price={product.price}
                benefits={product.benefits}
                
              />
            )
        )}
      </div>
      <BuyDetails />
      <Menu/>
      
    </div>
  );
}
