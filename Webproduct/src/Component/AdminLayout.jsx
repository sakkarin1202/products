import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../page/Navbar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="h-screen">
        <Outlet />
      </div>
      <Footer />
    </AuthProvider>
  );
};

export default AdminLayout;
