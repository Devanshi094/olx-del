import { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Bikes() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [model, setModel] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const brands = [ 
    "Suzuki", "Harley-Davidson", "BMW", "Kawasaki", "Ducati", "Benelli", "Mahindra",
    "Royal Enfield", "Hero", "Other Brands",
  ];

  const models = [
    "SingleShotPlus", "Hayate", "Intruder M1800R", "Heat", "Zeus",
    "Fiero", "Samurai", "Shaolin", "MAX100", "Katana",
    "Hayabusa", "M1800RZ", "GSX-R1000", "GS", "GSX",
    "Bandit", "Brezza", "Access Electric", "Access 125"
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleChangeClick = () => {
    setIsChanged(true);
    window.history.back(); // Go back to the previous page
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (photos.length + files.length <= 20) {
      const newPhotos = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setPhotos([...photos, ...newPhotos]);
    } else {
      alert("You can upload a maximum of 20 photos");
    }
  };

  const handleBrandInput = (e) => {
    const input = e.target.value;
    setBrand(input);
    const filtered = brands.filter((brand) =>
      brand.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBrands(filtered);
    setShowDropdown(true);
  };

  const handleModelInput = (e) => {
    const input = e.target.value;
    setModel(input);
    const filtered = models.filter(model => 
      model.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredModels(filtered);
    setShowModelDropdown(true);
  };

  const handleStateInput = (e) => {
    const input = e.target.value;
    setState(input);
    const filtered = states.filter(state => 
      state.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredStates(filtered);
    setShowStateDropdown(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!brand || !model || !adTitle || !description || !price || !state || !phone || photos.length === 0) {
      alert("Please fill all required fields and upload at least one photo.");
      return;
    }

    setLoading(true);
    setError("");
    setShowLoadingPopup(true); // Show loading popup

    try {
      const formData = new FormData();
      formData.append("category", "Bikes");
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("year", year);
      formData.append("kmDriven", kmDriven);
      formData.append("adTitle", adTitle);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("state", state);
      formData.append("name", name);
      formData.append("phone", phone);

      // Append images
      photos.forEach((photo) => {
        formData.append("photos", photo.file);
      });

      const response = await axios.post('http://localhost:5000/api/ads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setLoading(false);
      alert("Ad posted successfully!");
      
      // Store last posted ad info in localStorage
      localStorage.setItem("lastPostedAd", JSON.stringify({
        adTitle,
        price,
        brand,
        model,
        photos: response.data.ad?.photos || []
      }));
      
      setTimeout(() => {
        setLoading(false);
        setShowLoadingPopup(false);
        navigate("/ad-posted-success");
      }, 5000);
      
    } catch (error) {
      console.error("Error posting bike ad:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setLoading(false);
      setShowLoadingPopup(false);
    }
  };

  return (
    <ScrollArea.Root className="w-full h-screen p-6 overflow-auto bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-semibold text-center">POST YOUR AD</h1>

        {/* Selected Category */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">SELECTED CATEGORY</h2>
          <p>
            Bikes / Motorcycles {" "}
            <span
              className={`cursor-pointer ${
                isChanged ? "text-black underline" : "text-blue-600"
              } hover:text-black hover:underline`}
              onClick={handleChangeClick}
            >
              Change
            </span>
          </p>
        </div>

        {/* Include Some Details */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">INCLUDE SOME DETAILS</h2>
          {/* Brand Input and Dropdown */}
          <div className="mt-4 relative">
            <label className="block mt-2">Brand *</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={brand}
              onChange={handleBrandInput}
              onFocus={() => setShowDropdown(true)}
              placeholder="Type or select brand"
            />

            {showDropdown && filteredBrands.length > 0 && (
            <ScrollArea.Root className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-auto">
              <ScrollArea.Viewport>
                {filteredBrands.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setBrand(item);
                      setShowDropdown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </ScrollArea.Viewport>
            </ScrollArea.Root>
            )}
          </div>
            
        {/* Model Input and Dropdown */}
        <div className="mt-4 relative">
          <label className="block mt-2">Model *</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={model}
            onChange={handleModelInput}
            onFocus={() => setShowModelDropdown(true)}
            placeholder="Type or select model"
          />

          {showModelDropdown && filteredModels.length > 0 && (
            <ScrollArea.Root className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-auto">
              <ScrollArea.Viewport>
                {filteredModels.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setModel(item);
                      setShowModelDropdown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          )}
        </div>
    
        <label className="block mt-2">Year *</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter manufacturing year"
        />

        {/* KM Driven */}
        <label className="block mt-2">KM Driven *</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={kmDriven}
          onChange={(e) => setKmDriven(e.target.value)}
          placeholder="Enter kilometers driven"
        />

        {/* Ad Title */}
        <label className="block mt-4">Ad Title *</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={adTitle}
          onChange={(e) => setAdTitle(e.target.value)}
          placeholder="Enter a catchy title"
        />

        {/* Description */}
        <label className="block mt-4">Description *</label>
        <textarea
          className="w-full border p-2 rounded h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your bike"
        />

        {/* Set a Price */}
        <label className="block mt-4">SET A PRICE (Rs.) *</label>
        <div className="flex items-center border rounded p-2">
          <span className="mr-2 text-gray-500">₹</span>
          <input
            type="text"
            className="w-full outline-none"
            value={price}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setPrice(e.target.value);
              }
            }}
            placeholder="Enter price"
          />
        </div>

        {/* Upload Photos (Compulsory) */}
        <label className="block mt-4">Upload Up to 20 Photos *</label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <label className="border p-6 flex items-center justify-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handlePhotoUpload}
              accept="image/*"
              multiple
            />
            <span className="text-gray-500">+ Add Photo</span>
          </label>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo.preview}
              alt="Uploaded"
              className="border p-1 w-full h-24 object-cover"
            />
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">CONFIRM YOUR LOCATION</h2>
          <div className="relative">
            <label className="block mt-2">State *</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={state}
              onChange={handleStateInput}
              onFocus={() => setShowStateDropdown(true)}
              placeholder="Type or select state"
            />
            
            {showStateDropdown && filteredStates.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                {filteredStates.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setState(item);
                      setShowStateDropdown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review Your Details */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">REVIEW YOUR DETAILS</h2>
          <label className="block mt-2">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mt-2">Mobile Phone Number *</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Submit Button */}
        <button 
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Ad"}
        </button>
      </div>

      {/* Loading Popup */}
{showLoadingPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <div className="flex flex-col items-center">
        <Loader2 size={50} className="text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold mb-2">Posting Your Ad</h2>
        <p className="text-gray-600 text-center">
          Please wait while we process your ad. This will just take a moment...
        </p>
      </div>
    </div>
  </div>
)}
    </div>
      </ScrollArea.Root>

)};