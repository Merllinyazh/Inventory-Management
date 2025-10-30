import React from "react";
import { Home, Package, MapPin, MoveRight, BarChart } from "lucide-react";
import { NavLink } from "react-router-dom";
import{motion} from "framer-motion";
export default function Sidebar() {
  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/Home" },
    { name: "Product", icon: <Package size={20} />, path: "/product" },
    { name: "Location", icon: <MapPin size={20} />, path: "/location" },
    { name: "Movement", icon: <MoveRight size={20} />, path: "/movement" },
    { name: "Report", icon: <BarChart size={20} />, path: "/report" }
  ];

  return (
    <motion.aside
      className="h-screen w-64 bg-[#f9f4f7] shadow-2xl border-r border-[#d9c6d3] flex flex-col py-8"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="flex flex-col space-y-2 px-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-[#643c50] text-white shadow-lg"
                  : "text-[#4a1f3c] hover:bg-[#e6d3dc] hover:text-[#2e0f23]"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

    </motion.aside>
  );
}
