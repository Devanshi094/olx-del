import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./SideBar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); // Redirect to login if no token
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar with Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600">1</h2>
            <p className="text-gray-500">New Users</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600">20</h2>
            <p className="text-gray-500">Total Orders</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-pink-600">11</h2>
            <p className="text-gray-500">Products Sold</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-600">Rs.677</h2>
            <p className="text-gray-500">This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
