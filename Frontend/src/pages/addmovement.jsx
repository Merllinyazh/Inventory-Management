import React, { useEffect, useState } from "react";
import {
  addMovement,
  updateMovement,
  getProducts,
  getLocations,
  getMovements,
} from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMovement() {
  const [form, setForm] = useState({
    movement_id: "",
    product_name: "",
    product_id: "",
    from_location: "",
    to_location: "",
    mov_qty: "",
  });
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [movements, setMovements] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    fetchProducts();
    fetchLocations();
    fetchMovements();
    if (isEdit) fetchMovementDetails();
  }, [id]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const fetchLocations = async () => {
    const res = await getLocations();
    setLocations(res.data);
  };

  const fetchMovements = async () => {
    const res = await getMovements();
    setMovements(res.data);
  };

  const fetchMovementDetails = async () => {
    const res = await getMovements();
    const mov = res.data.find((m) => m.movement_id === id);
    if (mov) setForm({ ...mov });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit) {
      const duplicate = movements.some(
        (m) => m.movement_id === form.movement_id
      );
      if (duplicate) {
        toast.warn("Movement ID already exists!", {
          position: "top-center",
          autoClose: 2500,
        });
        return;
      }
    }

    const selectedProduct = products.find(
      (p) => p.product_name === form.product_name
    );
    if (!selectedProduct) {
      toast.warn("Please select a valid product.", { position: "top-center" });
      return;
    }

    if (parseInt(form.mov_qty) > parseInt(selectedProduct.qty)) {
      toast.error("Movement quantity exceeds available stock.", {
        position: "top-center",
      });
      return;
    }

    const payload = {
      movement_id: form.movement_id,
      product_id: selectedProduct.product_id,
      product_name: form.product_name,
      from_location: form.from_location,
      to_location: form.to_location,
      mov_qty: form.mov_qty,
    };

    try {
      if (isEdit) {
        await updateMovement(form.movement_id, payload);
        toast.success("Movement updated successfully!", {
          position: "top-center",
        });
      } else {
        await addMovement(payload);
        toast.success("Movement added successfully!", {
          position: "top-center",
        });
      }
      setTimeout(() => navigate("/movement"), 1500);
    } catch (error) {
      toast.error("Error saving movement.", { position: "top-center" });
    }
  };

  return (
    <div
      className="min-h-[85vh] py-5 px-6 flex flex-col items-center"
      style={{ background: "linear-gradient(135deg, #f8f8f8 60%, #eaeaea 100%)" }}
    >
      <h1 className="text-3xl font-bold mb-8 text-[#4a1f3c]">
        {isEdit ? "Edit Movement" : "Add Movement"}
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEdit && (
            <div>
              <label className="block text-gray-700 mb-2">Movement ID</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
                value={form.movement_id}
                onChange={(e) =>
                  setForm({ ...form, movement_id: e.target.value })
                }
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Product</label>
            <select
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
              value={form.product_name}
              onChange={(e) => {
                const name = e.target.value;
                const prod = products.find((p) => p.product_name === name);
                setForm({
                  ...form,
                  product_name: name,
                  product_id: prod ? prod.product_id : "",
                });
              }}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.product_id} value={p.product_name}>
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 mb-2">From Location</label>
    <select
      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
      value={form.from_location}
      onChange={(e) =>
        setForm({ ...form, from_location: e.target.value })
      }
    >
      <option value="">Select From</option>
      {locations.map((loc) => (
        <option key={loc.location_id} value={loc.location_name}>
          {loc.location_name}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-gray-700 mb-2">To Location</label>
    <select
      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
      value={form.to_location}
      onChange={(e) =>
        setForm({ ...form, to_location: e.target.value })
      }
    >
      <option value="">Select To</option>
      {locations.map((loc) => (
        <option key={loc.location_id} value={loc.location_name}>
          {loc.location_name}
        </option>
      ))}
    </select>
  </div>
</div>


          <div>
            <label className="block text-gray-700 mb-2">Movement Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity to move"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
              value={form.mov_qty}
              onChange={(e) => setForm({ ...form, mov_qty: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/movements")}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-xl hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4a1f3c] text-white px-6 py-2 rounded-xl hover:bg-[#643c50]"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
