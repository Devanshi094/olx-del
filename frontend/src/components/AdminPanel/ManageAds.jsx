import { useState, useEffect } from "react";

const ManageAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const res = await fetch("http://localhost:5000/api/ads");
      const data = await res.json();
      setAds(data);
    };
    fetchAds();
  }, []);

  const deleteAd = async (id) => {
    await fetch(`http://localhost:5000/api/ads/${id}`, { method: "DELETE" });
    setAds(ads.filter((ad) => ad._id !== id));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Manage Ads</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="hover:bg-gray-50">
                <td className="p-3 border">{ad.title}</td>
                <td className="p-3 border">Rs. {ad.price}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => deleteAd(ad._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAds;
