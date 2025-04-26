
const AdminNavbar = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
