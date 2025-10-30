import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Location from "./pages/Location";
import Movement from "./pages/movement";
import AddProduct from "./pages/addproduct";
import AddLocation from "./pages/addlocation";
import AddMovement from "./pages/addmovement";
import Report from "./pages/report";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "./App.css";

// Layout Wrapper for pages with Navbar + Sidebar
const DashboardLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <div className="p-4 overflow-auto">{children}</div>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Re-check login state whenever route changes
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, [location]); 
  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Dashboard Routes */}
      {isAuthenticated && (
        <>
          <Route
            path="/home"
            element={
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            }
          />
          <Route
            path="/product"
            element={
              <DashboardLayout>
                <Product />
              </DashboardLayout>
            }
          />
          <Route
            path="/location"
            element={
              <DashboardLayout>
                <Location />
              </DashboardLayout>
            }
          />
          <Route
            path="/movement"
            element={
              <DashboardLayout>
                <Movement />
              </DashboardLayout>
            }
          />
          <Route
            path="/addproduct"
            element={
              <DashboardLayout>
                <AddProduct />
              </DashboardLayout>
            }
          />

          <Route path="/addproduct/:id" element={<DashboardLayout>
                <AddProduct />
              </DashboardLayout>} />


          <Route path="/addlocation" element={<DashboardLayout> <AddLocation /></DashboardLayout>}
          />

          <Route path="/addlocation/:id" element={<DashboardLayout> <AddLocation /></DashboardLayout>}
          />


          <Route
            path="/addmovement"
            element={
              <DashboardLayout>
                <AddMovement />
              </DashboardLayout>
            }
/>
            <Route
            path="/addmovement/:id"
            element={
              <DashboardLayout>
                <AddMovement />
              </DashboardLayout>
            }
          
          />
          <Route path="/report" element={<DashboardLayout><Report /></DashboardLayout>} />

          

        </>
      )}

      {/* Redirect any unknown route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <AppRoutes />
    </Router>
  );
}
