import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

function AddUser() {
  const { state } = useLocation();
  const [selectedRole, setSelectedRole] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [input, setInput] = useState({
    user_name: "",
    email: "",
    password: "",
    id: "",
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setInput({
        user_name: state?.Name || "",
        email: state?.email || "",
        password: state?.password || "",
        id: state?.id || "",
      });
      setSelectedRole(state?.role || "");
      setIsFirstLoad(false);
    }
  }, [state, isFirstLoad]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (!input.user_name || !input.email || !input.password || !selectedRole) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("user_name", input.user_name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", selectedRole);
    formData.append("id", input.id);

    try {
      let response;
      if (state) {
        response = await axios.post(
          "http://localhost/api/editUser.php",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost/api/addUser.php",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      console.log("Success:", response.data);
      setSuccess(response.data.message || "Operation successful");
      setInput({ user_name: "", email: "", password: "", id: "" });
      setSelectedRole("");
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
          {state ? "Edit User" : "Add User"}
        </h1>

        {error && (
          <div className="p-4 mb-6 text-red-500 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 mb-6 text-green-500 bg-green-100 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              User Name
            </label>
            <input
              type="text"
              name="user_name"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              value={input.user_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              value={input.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="text"
              name="password"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              value={input.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Role
            </label>
            <select
              name="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
              required
            >
              <option value="" disabled>
                Select a Role
              </option>
              <option>CEO</option>
              <option>Admin</option>
              <option>Mid-admin</option>
              <option>Employee</option>
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

export default AddUser;
