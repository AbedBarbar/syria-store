import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardHome() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get("http://localhost/api/latestProducts.php");
        setLatestProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to fetch latest products.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  return (
    <div className="p-8 text-white bg-[#0f172a] min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard</h1>

      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">🆕 Latest Products</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : latestProducts.length === 0 ? (
          <p className="text-gray-400 italic">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-300 uppercase text-sm">
                  <th className="px-6 py-3 bg-[#334155] rounded-l-xl">Product Name</th>
                  <th className="px-6 py-3 bg-[#334155]">Category</th>
                  <th className="px-6 py-3 bg-[#334155] rounded-r-xl">Price</th>
                </tr>
              </thead>
              <tbody>
                {latestProducts.map((item) => (
                  <tr key={item.id} className="bg-[#334155] hover:bg-[#475569] transition rounded-xl">
                    <td className="px-6 py-4 rounded-l-xl font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.Type || "N/A"}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold rounded-r-xl">
                      ${item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
