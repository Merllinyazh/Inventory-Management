import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getProducts, getLocations, getMovements } from "./api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productRes, locationRes, movementRes] = await Promise.all([
        getProducts(),
        getLocations(),
        getMovements(),
      ]);
      setProducts(productRes.data || []);
      setLocations(locationRes.data || []);
      setMovements(movementRes.data || []);
    } catch (err) {
      console.error(" Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = locations.map((loc) => {
    const count = movements.filter(
      (m) => m.to_location === loc.location_name
    ).length;
    return { location: loc.location_name, movements: count };
  });

  return (
    <div
      className="min-h-[85vh]  flex flex-col items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2a0f23 30%, #4a1f3c 70%)",
        color: "#f8f8f8",
        paddingTop: "40px", 
      }}
    >
      
      <h1
        className="text-4xl font-bold text-center mb-6 tracking-wide drop-shadow-lg"
        style={{ color: "#E0BBE4" }}
      >
         Inventory Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-10/12">


        {/* Products */}
        <div
          className="rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: "#f8f8f8",
            color: "#2a0f23",
            border: "1px solid #dcdcdc",
          }}
        >
          <h2 className="text-md text-center font-semibold text-[#4a1f3c] mb-2">
            Total Products
          </h2>
          <p className="text-3xl text-center font-bold text-[#643c50]">
            {loading ? "..." : products.length}
          </p>
        </div>

        {/* Locations */}
        <div
          className="rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: "#f8f8f8",
            color: "#2a0f23",
            border: "1px solid #dcdcdc",
          }}
        >
          <h2 className="text-md text-center font-semibold text-[#4a1f3c] mb-2">
            Total Locations
          </h2>
          <p className="text-3xl text-center font-bold text-[#643c50]">
            {loading ? "..." : locations.length}
          </p>
        </div>

        {/* Movements */}
        <div
          className="rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: "#f8f8f8",
            color: "#2a0f23",
            border: "1px solid #dcdcdc",
          }}
        >
          <h2 className="text-md text-center font-semibold text-[#4a1f3c] mb-2">
            Total Movements
          </h2>
          <p className="text-3xl text-center font-bold text-[#643c50]">
            {loading ? "..." : movements.length}
          </p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div
        className="rounded-xl shadow-xl border p-6 w-10/12"
        style={{
          backgroundColor: "#f8f8f8",
          borderColor: "#dcdcdc",
          color: "#2a0f23",
          height: "300px", 
        }}
      >
        <h2 className="text-xl font-semibold text-center mb-3 text-[#4a1f3c]">
          Movements by Location
        </h2>

        {loading ? (
          <p className="text-center text-[#8c8c8c]">Loading chart...</p>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
              
              <XAxis dataKey="location" tick={{ fill: "#643c50",fontSize: 10 }} />
              <YAxis tick={{ fill: "#643c50" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #dcdcdc",
                  borderRadius: "10px",
                  color: "#2a0f23",
                }}
              />
              <Bar dataKey="movements" fill="#4a1f3c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-[#8c8c8c]">No data available</p>
        )}
      </div>
    </div>
  );
}
