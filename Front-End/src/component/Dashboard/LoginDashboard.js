import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginDashboard() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!input.email || !input.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/api/LoginDashboard.php",
        input
      );

      console.log(response.data); // 👈 هنا تضعه لمعاينة رد السيرفر

      if (response.data.status === "success") {
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard", { state: userData });
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.log(err); // 👈 وهذا أيضًا مفيد إذا حدث خطأ في الاتصال
      setError(
  err.response?.data?.message ||
  err.message ||
  "An unexpected error occurred"
);


    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-gray-700 text-white rounded"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 bg-gray-700 text-white rounded"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white rounded ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginDashboard;
