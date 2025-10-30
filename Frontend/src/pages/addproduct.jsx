import React, { useEffect, useState } from "react";
import { addProduct, updateProduct, getProducts } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [form, setForm] = useState({ product_id: "", product_name: "", qty: "" });
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
        const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProductList(res.data || []);

        // If editing, prefill data
        if (isEdit) {
          const product = res.data.find((p) => String(p.product_id) === String(id));
          if (product) {
            setForm({
              product_id: product.product_id,
              product_name: product.product_name,
              qty: product.qty,
            });
          }
        }
      } catch (error) {
        toast.error("Failed to load product details!");
      }
    };
    fetchProducts();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Duplicate check only for Add mode
      if (!isEdit) {
        const existing = productList.find(
          (p) => String(p.product_id).trim().toLowerCase() === String(form.product_id).trim().toLowerCase()
        );
        if (existing) {
          toast.error(" Product ID already exists! Please use a different ID.");
          return;
        }
      }

      if (isEdit) {
        await updateProduct(form.product_id, {
          product_name: form.product_name,
          qty: form.qty,
        });
        toast.success(" Product updated successfully!");
      } else {
        await addProduct(form);
        toast.success(" Product added successfully!");
      }

      setTimeout(() => navigate("/product"), 1000);
    } catch (error) {
      toast.error(" Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-[85vh] py-10 px-6 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #f8f8f8 60%, #eaeaea 100%)",
      }}
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-[#4a1f3c] tracking-wide drop-shadow-sm">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h1>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEdit && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product ID
              </label>
              <input
                type="text"
                placeholder="e.g., P001"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c] focus:outline-none"
                value={form.product_id}
                onChange={(e) => setForm({ ...form, product_id: e.target.value })}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c] focus:outline-none"
              value={form.product_name}
              onChange={(e) => setForm({ ...form, product_name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter available quantity"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c] focus:outline-none"
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: e.target.value })}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/product")}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-xl shadow hover:bg-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4a1f3c] text-white px-6 py-2 rounded-xl shadow-md hover:bg-[#643c50] hover:shadow-lg transition-all duration-300"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
