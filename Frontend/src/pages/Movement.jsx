import React, { useEffect, useState } from "react";
import { getMovements } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function MovementList() {
  const [movements, setMovements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      const res = await getMovements();
      let data = res.data || [];

      
      data.sort((a, b) => {
        const extractLastThreeDigits = (id) => {
          // Convert to string and match the last 3 digits (ignoring prefix)
          const match = id.toString().match(/(\d{1,3})$/);
          return match ? parseInt(match[1], 10) : 0;
        };

        const numA = extractLastThreeDigits(a.movement_id);
        const numB = extractLastThreeDigits(b.movement_id);

        return numA - numB;
      });

      setMovements(data);
    } catch (error) {
      console.error("Error fetching movements:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/addmovement/${id}`);
  };

  return (
    <div
      className="min-h-[85vh] py-5 px-6 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #f8f8f8 60%, #eaeaea 100%)",
      }}
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-[#4a1f3c] tracking-wide drop-shadow-sm">
        Movements History
      </h1>

      {/* Add Movement Button */}
      <div className="w-full max-w-6xl flex justify-end mb-6">
        <Link
          to="/addmovement"
          className="bg-[#4a1f3c] text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-[#643c50] transition-all duration-300"
        >
          + Add Movement
        </Link>
      </div>

      {/* Movement Table */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-center border-collapse">
          <thead className="bg-[#f1e6f0]">
            <tr>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Movement ID
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Product
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Quantity
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                From Location
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                To Location
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {movements.length > 0 ? (
              movements.map((m, index) => (
                <tr
                  key={m.movement_id}
                  className={`${
                    index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                  } hover:bg-[#f7edf5] transition-all duration-200`}
                >
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100">
                    {m.movement_id}
                  </td>
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100 font-medium">
                    {m.product_name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                    {m.mov_qty}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                    {m.from_location}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                    {m.to_location}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <button
                      onClick={() => handleUpdate(m.movement_id)}
                      className="bg-[#643c50] text-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-[#4a1f3c] hover:shadow-md transition-all duration-300"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-gray-500 text-sm font-medium"
                >
                  No movements available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
