import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost/api/index.php")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("There was an error fetching the products!", error)
      );
  }, []);

  const handleUpdate = (product) => {
    navigate(`/dashboard/AddProduct`, {
      state: { id: product.id, ...product },
    });
  };

  const handleDelete = (product) => {
    axios.post("http://localhost/api/deleteProduct.php", { id: product.id })

      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
      })
      .catch((error) =>
        console.error("There was an error deleting the product!", error)
      );
  };

  return (
    <div className="container p-6 mx-auto bg-[#111827] shadow-md min-h-[100vh]">
      <h2 className="mb-6 text-2xl font-bold text-center text-white">
        Products Table
      </h2>
      <table className="w-full overflow-hidden text-sm text-left text-gray-400 border border-gray-700 rounded-md">
        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={index}
                className="transition duration-200 hover:bg-gray-500"
              >
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.Type}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="flex items-center justify-center gap-4 px-6 py-4 text-center">
                  <button
                    onClick={() => handleUpdate(product)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FontAwesomeIcon icon={faPlus} title="Edit" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} title="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 italic text-center text-gray-500"
              >
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
