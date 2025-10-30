import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import warehouseImg from "../assets/ware.jpg"; // your image

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate delay
    setTimeout(() => {
      setLoading(false);

      
      if (userId === "Admin" && password === "12345") {
        toast.success(" Welcome Admin!", { position: "top-center", autoClose: 2000 });
        localStorage.setItem("isAuthenticated", "true");

        setTimeout(() => {
          window.location.href = "/home"; 
        }, 2000);
      } else {
        toast.error(" Invalid credentials", { position: "top-center", autoClose: 2000 });
      }
    }, 1200);
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #7c3b52 0%, #4a1f3c 50%, #2e0f23 100%)",
      }}
    >
      {/* Left Image Section */}
      <div className="w-1/2 h-full relative">
        <img
          src={warehouseImg}
          alt="Warehouse"
          className="object-cover w-full h-full rounded-r-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
        <div className="absolute inset-0 bg-black/25 rounded-r-[50px]" />
      </div>

      {/* Right Login Section */}
      <div className="w-1/2 flex justify-center items-center relative">
        <ToastContainer />
        <motion.div
          className="bg-[#f8f8f8] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 w-[400px] border border-[#dcdcdc]"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            boxShadow: `
              0 8px 30px rgba(76, 0, 34, 0.4), 
              0 0 40px rgba(100, 60, 80, 0.3)
            `,
          }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#4a1f3c] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
             Admin Login
          </h2>

          <form onSubmit={handleLogin}>
            {/* Username */}
            <label className="block text-left text-[#8c8c8c] font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full mb-4 p-3 rounded-lg border border-[#dcdcdc] bg-[#ffffff] text-[#141414]
                         focus:outline-none focus:ring-2 focus:ring-[#643c50]
                         shadow-[inset_0_2px_5px_rgba(0,0,0,0.1),0_2px_5px_rgba(100,60,80,0.15)]"
              required
            />

            {/* Password */}
            <label className="block text-left text-[#8c8c8c] font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-6 p-3 rounded-lg border border-[#dcdcdc] bg-[#ffffff] text-[#141414]
                         focus:outline-none focus:ring-2 focus:ring-[#643c50]
                         shadow-[inset_0_2px_5px_rgba(0,0,0,0.1),0_2px_5px_rgba(100,60,80,0.15)]"
              required
            />

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(100, 60, 80, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#643c50] text-white py-3 rounded-xl font-semibold 
                         shadow-[0_6px_20px_rgba(100,60,80,0.4)] 
                         hover:bg-[#4a1f3c] transition"
            >
              {loading ? " Logging in..." : "Login"}
            </motion.button>
          </form>

          
        </motion.div>
      </div>
    </div>
  );
}
