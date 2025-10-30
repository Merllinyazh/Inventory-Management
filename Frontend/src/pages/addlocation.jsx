import React, { useEffect, useState } from "react";
import { addLocation, updateLocation, getLocations } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddLocation() {
  const [form, setForm] = useState({
    location_id: "",
    location_name: "",
    address: "",
  });
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    fetchLocations();
  }, [id]);

  const fetchLocations = async () => {
    const res = await getLocations();
    setLocations(res.data);

    if (isEdit) {
      const loc = res.data.find((l) => String(l.location_id) === String(id));
      if (loc) setForm({ ...loc });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit) {
      const duplicate = locations.some(
        (loc) => String(loc.location_id) === String(form.location_id)
      );
      if (duplicate) {
        toast.warn("Location ID already exists!", {
          position: "top-center",
          autoClose: 2500,
        });
        return;
      }
    }

    try {
      if (isEdit) {
        await updateLocation(form.location_id, {
          location_name: form.location_name,
          address: form.address,
        });
        toast.success("Location updated successfully!", {
          position: "top-center",
        });
      } else {
        await addLocation(form);
        toast.success("Location added successfully!", {
          position: "top-center",
        });
      }
      setTimeout(() => navigate("/locations"), 1500);
    } catch (err) {
      toast.error("Failed to save location.", { position: "top-center" });
    }
  };

  return (
    <div
      className="min-h-[85vh] py-10 px-6 flex flex-col items-center"
      style={{ background: "linear-gradient(135deg, #f8f8f8 60%, #eaeaea 100%)" }}
    >
      <h1 className="text-3xl font-bold mb-8 text-[#4a1f3c]">
        {isEdit ? "Edit Location" : "Add New Location"}
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEdit && (
            <div>
              <label className="block text-gray-700 mb-2">Location ID</label>
              <input
                type="text"
                placeholder="e.g., L001"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
                value={form.location_id}
                onChange={(e) =>
                  setForm({ ...form, location_id: e.target.value })
                }
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Location Name</label>
            <input
              type="text"
              placeholder="Enter location name"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
              value={form.location_name}
              onChange={(e) =>
                setForm({ ...form, location_name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#4a1f3c]"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/locations")}
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
