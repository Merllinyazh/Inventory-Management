// src/pages/api.jsx
import axios from "axios";

export const baseURL = "http://localhost:5000/api"; // adjust if your backend port differs

export const api = axios.create({
  baseURL,
});


export const loginUser = async (username, password) => {
  try {
    const res = await api.post("/login", { username, password });
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};


export const getProducts = () => api.get("/product");
export const addProduct = (data) => api.post("/product", data);
export const deleteProduct = (id) => api.delete(`/product/${id}`);
export const updateProduct = (id, data) => api.put(`/product/${id}`, data);


export const getLocations = () => api.get("/locations");
export const addLocation = (data) => api.post("/locations", data);
export const deleteLocation = (id) => api.delete(`/locations/${id}`);
export const updateLocation = (id, data) => api.put(`/locations/${id}`, data);


export const getMovements = () => api.get("/movements");
export const addMovement = (data) => api.post("/movements", data);
export const updateMovement = (id, data) => api.put(`/movements/${id}`, data);
export const getMovementById = (id) => api.get(`/movements/${id}`);


export const getDropdownData = async () => {
  try {
    
    const [productRes, locationRes] = await Promise.all([
      api.get("/product"),
      api.get("/locations"),
    ]);
    return {
      products: productRes.data,
      locations: locationRes.data,
    };
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
    return { products: [], locations: [] };
  }
};

// Report API
export const getReport = () => api.get("/report");
