import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    
    toast.info(" Logged out successfully!", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/"); 
    }, 1500);
  };

  return (
    <nav
      className="bg-linear-to-r from-[#4a1f3c] to-[#643c50] text-white px-6 py-4 
                 flex justify-between items-center shadow-md"
    >
      
      <h1 className="text-2xl font-bold tracking-wide drop-shadow-sm">
        Warehouse Inventory
      </h1>

      
      <button
        onClick={handleLogout}
        className="bg-white text-[#4a1f3c] px-4 py-2 rounded-lg font-semibold 
                   hover:bg-[#f3e8ed] hover:shadow-md transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
}
