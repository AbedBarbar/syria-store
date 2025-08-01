import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

function AddProduct() {
  const { state } = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    product_name: "",
    price: "",
    description: "",
    id: "",
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // تعبئة البيانات في حالة التعديل
  useEffect(() => {
    if (isFirstLoad) {
      setInput({
        product_name: state?.name || "",
        price: state?.price || "",
        description: state?.benefits || "",
        id: state?.id || "",
      });
      setSelectedCategory(state?.Type || "");
      setIsFirstLoad(false);
    }
  }, [state, isFirstLoad]);

  // جلب التصنيفات
  useEffect(() => {
    axios
      .get("http://localhost/api/getCategories.php")
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      });
  }, []);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (
      !input.product_name ||
      !input.price ||
      !input.description ||
      !selectedCategory
    ) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("product_name", input.product_name);
    formData.append("price", input.price);
    formData.append("description", input.description);
    formData.append("category", selectedCategory);
    formData.append("id", input.id);
    if (image) {
      formData.append("image", image);
    }

    try {
      let response;
      if (state) {
        // تعديل منتج
        response = await axios.post(
          "http://localhost/api/editProduct.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // إضافة منتج
        response = await axios.post(
          "http://localhost/api/addProduct.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log("Success:", response.data);
      setSuccess(true);
      setInput({
        product_name: "",
        price: "",
        description: "",
      });
      setSelectedCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-gradient-to-b">
      <div className="w-full max-w-4xl p-8 bg-gray-900 shadow-lg rounded-xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-white">
          {state ? "Edit Product" : "Add Product"}
        </h1>

        {error && (
          <div className="p-4 mb-6 text-red-500 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 mb-6 text-green-500 bg-green-100 rounded-lg">
            Product {state ? "updated" : "added"} successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              value={input.product_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Price
            </label>
            <input
              type="text"
              name="price"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              value={input.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              value={input.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-3 text-gray-400 bg-gray-700 border border-gray-600 rounded-lg"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 text-lg font-medium text-white rounded-lg ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : state ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
