import { Link, useNavigate } from "react-router-dom";
import { Home, Users, FileText, LogOut } from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear any authentication tokens or user data from localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    
    // You might need to adjust these keys based on how your authentication is implemented
    // If you're using a more general auth token, you might want to use:
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    
    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col items-center">
      {/* Profile Section */}
      <div className="flex items-center mb-6 gap-3">
        <img
          src="../../assets/random/admin.jpg"
          alt="Admin Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-700"
        />
        <h2 className="text-xl font-bold">DEL</h2>
      </div>

      {/* Navigation Links */}
      <nav className="w-full">
        <Link
          to="/admin/dashboard"
          className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded"
        >
          <Home className="mr-2" /> Dashboard
        </Link>
        <Link
          to="/admin/manage-ads"
          className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded"
        >
          <FileText className="mr-2" /> Manage Ads
        </Link>
        <Link
          to="/admin/manage-users"
          className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded"
        >
          <Users className="mr-2" /> Manage Users
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center py-2 px-4 mt-4 bg-red-600 hover:bg-red-700 rounded"
        >
          <LogOut className="mr-2" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
