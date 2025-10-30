import React, { useEffect, useState } from "react";
import { getProducts } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();

    // ✅ Sort products by last three digits of product_id
    const sorted = [...(res.data || [])].sort((a, b) => {
      const idA = parseInt(a.product_id.slice(-3), 10);
      const idB = parseInt(b.product_id.slice(-3), 10);
      return idA - idB;
    });

    setProducts(sorted);
  };

  const handleUpdate = (id) => {
    navigate(`/addproduct/${id}`);
  };

  return (
    <div
      className="min-h-[85vh] py-5 px-6 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #f8f8f8 60%, #eaeaea 100%)",
      }}
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 mr-18 text-[#4a1f3c] tracking-wide drop-shadow-sm">
        Product Inventory
      </h1>

      {/* Add Product Button */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <Link
          to="/addproduct"
          className="bg-[#4a1f3c] text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-[#643c50] transition-all duration-300"
        >
          + Add Product
        </Link>
      </div>

      {/* Product Table */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-center border-collapse">
          <thead className="bg-[#f1e6f0]">
            <tr>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                ID
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Product Name
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Quantity
              </th>
              <th className="py-3 px-4 text-[#2a0f23] text-sm font-semibold border-b border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p, index) => (
                <tr
                  key={p.product_id}
                  className={`${
                    index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
                  } hover:bg-[#f7edf5] transition-all duration-200`}
                >
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100">
                    {p.product_id}
                  </td>
                  <td className="py-3 px-4 text-gray-800 border-b border-gray-100 font-medium">
                    {p.product_name}
                  </td>

                  {/* Quantity Badge */}
                  <td className="py-3 px-4 text-gray-700 border-b border-gray-100">
                    {p.qty > 0 ? (
                      <span>{p.qty}</span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 border border-red-300 rounded-full shadow-sm">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 border-b border-gray-100">
                    <button
                      onClick={() => handleUpdate(p.product_id)}
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
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
