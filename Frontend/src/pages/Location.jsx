import React, { useEffect, useState } from "react";
import { getLocations } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function LocationList() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await getLocations();
    let data = res.data || [];

    // ✅ Sort by last three digits of location_id
    data.sort((a, b) => {
      const lastA = parseInt(a.location_id.toString().slice(-3));
      const lastB = parseInt(b.location_id.toString().slice(-3));
      return lastA - lastB;
    });

    setLocations(data);
  };

  const handleUpdate = (id) => {
    navigate(`/addlocation/${id}`);
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
        Location Management
      </h1>

      {/* Add Location Button */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <Link
          to="/addlocation"
          className="bg-[#4a1f3c] text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-[#643c50] transition-all duration-300"
        >
          + Add Location
        </Link>
      </div>

      {/* Location Table */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-center border-collapse">
          <thead className="bg-[#f1e6f0]">
            <tr>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                ID
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Location Name
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Address
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {locations.length > 0 ? (
              locations.map((l, index) => (
                <tr
                  key={l.location_id}
                  className={`${
                    index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                  } hover:bg-[#f7edf5] transition-all duration-200`}
                >
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100">
                    {l.location_id}
                  </td>
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100 font-medium">
                    {l.location_name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                    {l.address}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <button
                      onClick={() => handleUpdate(l.location_id)}
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
                  colSpan="4"
                  className="py-6 text-gray-500 text-sm font-medium"
                >
                  No locations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
