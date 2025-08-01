import React, { useEffect, useState } from "react";
import Card2 from "./Card2";

export default function WithProduct() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  
  
  useEffect(() => {
    console.log("object");
    const fetchPurchasedProducts = () => {
      let products = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("countBuy_")) {
          const count = parseInt(localStorage.getItem(key));

          if (count > 0) {
            const index = key.split("_")[1];
            const productName = localStorage.getItem(`productName_${index}`);
            const productPrice = localStorage.getItem(`productPrice_${index}`);
            const productCount = localStorage.getItem(`countBuy_${index}`);
            products.push({
              id: index,
              name: productName,
              price: productPrice,
              count: productCount
            });
          }
        }
      }
      setPurchasedProducts(products);
    };

    fetchPurchasedProducts();
    // Set an event listener for storage changes
    const handleStorageChange = () => fetchPurchasedProducts();
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleProductUpdate = (productId, newCount) => {
    setPurchasedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, count: newCount } : product
      )
    );
  };

  return (
    <div>
      <div className="container products mt-[10px] pb-[50px] h-[fit-content] gap-y-[25px] grid grid-cols-[calc(90%/6)_calc(90%/6)_calc(90%/6)_calc(90%/6)_calc(90%/6)_calc(90%/6)] gap-x-[calc(10%/6)] w-full">
        {purchasedProducts.map((product, index) => (
          <Card2
            key={index}
            id={product.id}
            name={product.name}
            price={product.price}
            count={product.count}
            onProductUpdate={handleProductUpdate}
           
          />
        ))}
      </div>
    </div>
  );
}
