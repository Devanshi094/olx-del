import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Property() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    projectStatus: "",
    listedBy: "",
    carpetArea: "",
    maintenance: "",
    totalFloors: "",
    floorNo: "",
    carParking: "",
    facing: "",
    price: "",
    adTitle: "",
    description: "",
    state: "",
    name: "",
    phone: "",
  });
  
  const [photos, setPhotos] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showFacingDropdown, setShowFacingDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const states = ["Delhi", "Mumbai", "Karnataka", "Tamil Nadu", "Punjab"];
  const facingOptions = ["East", "West", "North", "South"];
  const filteredStates = states.filter((s) => s.toLowerCase().includes(formData.state.toLowerCase()));
  const filteredFacing = facingOptions.filter((f) => f.toLowerCase().includes(formData.facing.toLowerCase()));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = async (event) => {
    if (photos.length < 20) {
      const file = event.target.files[0];
      setPhotos([...photos, { file, preview: URL.createObjectURL(file) }]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.type || !formData.adTitle || !formData.description || !formData.price || !formData.state || !formData.phone || photos.length === 0) {
      alert("Please fill all required fields and upload at least one photo.");
      return;
    }
  
    setLoading(true);
    setError("");
    setShowLoadingPopup(true); // Show loading popup
  
    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add category type
      formDataToSend.append('category', 'property');
      
      // Add photos
      photos.forEach((photo) => {
        formDataToSend.append('photos', photo.file);
      });
      
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/ads', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setLoading(false);
      alert("Ad posted successfully!");
      
      // Store last posted ad info in localStorage
      localStorage.setItem("lastPostedAd", JSON.stringify({
        adTitle: formData.adTitle,
        price: formData.price,
        type: formData.type,
        bhk: formData.bhk,
        photos: response.data.ad?.photos || []
      }));
      
      setTimeout(() => {
        setLoading(false);
        setShowLoadingPopup(false);
        navigate("/ad-posted-success");
      }, 5000);
      
    } catch (error) {
      console.error('Error posting property ad:', error);
      setError(error.message || "Something went wrong. Please try again.");
      setLoading(false);
      setShowLoadingPopup(false);
    }
  };
  
  
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">POST YOUR AD</h2>
        
        {/* Category Section */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-2">SELECTED CATEGORY</p>
          <p className="text-gray-800 text-sm font-medium">
            Properties / For Sale: Houses & Apartments{" "}
            <span className="text-blue-500 cursor-pointer">Change</span>
          </p>
        </div>

        {/* Type Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">Type *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single" 
            value={formData.type}
            onValueChange={(value) => handleToggleChange('type', value)}
          >
            {["Flats / Apartments", "Independent / Builder Floors", "Farm House", "House & Villa"].map(
              (type) => (
                <ToggleGroup.Item
                  key={type}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={type}
                >
                  {type}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* BHK Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">BHK *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single"
            value={formData.bhk}
            onValueChange={(value) => handleToggleChange('bhk', value)}
          >
            {["1", "2", "3", "4", "4+"].map(
              (bhk) => (
                <ToggleGroup.Item
                  key={bhk}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={bhk}
                >
                  {bhk}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* Bathrooms Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">Bathrooms *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single"
            value={formData.bathrooms}
            onValueChange={(value) => handleToggleChange('bathrooms', value)}
          >
            {["1", "2", "3", "4", "4+"].map(
              (bathroom) => (
                <ToggleGroup.Item
                  key={bathroom}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={bathroom}
                >
                  {bathroom}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* Furnishing Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">Furnishing *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single"
            value={formData.furnishing}
            onValueChange={(value) => handleToggleChange('furnishing', value)}
          >
            {["Furnished", "Semi-Furnished", "Unfurnished"].map(
              (furnishing) => (
                <ToggleGroup.Item
                  key={furnishing}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={furnishing}
                >
                  {furnishing}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* Project Status Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">Project Status *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single"
            value={formData.projectStatus}
            onValueChange={(value) => handleToggleChange('projectStatus', value)}
          >
            {["New Launch", "Ready to Move", "Under Construction"].map(
              (status) => (
                <ToggleGroup.Item
                  key={status}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={status}
                >
                  {status}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* Listed by Selection */}
        <div className="mb-6">
          <p className="font-medium mb-2">Listed by *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single"
            value={formData.listedBy}
            onValueChange={(value) => handleToggleChange('listedBy', value)}
          >
            {["Builder", "Dealer", "Owner"].map(
              (listedBy) => (
                <ToggleGroup.Item
                  key={listedBy}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={listedBy}
                >
                  {listedBy}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* Carpet Area */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Carpet Area (sqft) *</label>
          <input
            type="text"
            name="carpetArea"
            className="w-full border p-2 rounded"
            value={formData.carpetArea}
            onChange={handleInputChange}
            placeholder="Enter carpet area in sqft"
          />
        </div>

        {/* Maintenance */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Maintenance (Monthly)</label>
          <input
            type="text"
            name="maintenance"
            className="w-full border p-2 rounded"
            value={formData.maintenance}
            onChange={handleInputChange}
            placeholder="Enter monthly maintenance amount"
          />
        </div>

        {/* Total Floors */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Total Floors</label>
          <input
            type="text"
            name="totalFloors"
            className="w-full border p-2 rounded"
            value={formData.totalFloors}
            onChange={handleInputChange}
            placeholder="Enter total number of floors"
          />
        </div>

        {/* Floor No */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Floor No</label>
          <input
            type="text"
            name="floorNo"
            className="w-full border p-2 rounded"
            value={formData.floorNo}
            onChange={handleInputChange}
            placeholder="Enter floor number"
          />
        </div>

        {/* Car Parking */}
        <div className="mb-6">
          <p className="font-medium mb-2">Car Parking *</p>
          <ToggleGroup.Root 
            className="flex gap-2 flex-wrap" 
            type="single"
            value={formData.carParking}
            onValueChange={(value) => handleToggleChange('carParking', value)}
          >
            {["0", "1", "2", "3"].map(
              (parking) => (
                <ToggleGroup.Item
                  key={parking}
                  className="px-4 py-2 border rounded-md text-sm cursor-pointer data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  value={parking}
                >
                  {parking}
                </ToggleGroup.Item>
              )
            )}
          </ToggleGroup.Root>
        </div>

        {/* Facing Dropdown */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Facing</label>
          <div className="relative">
            <input
              type="text"
              name="facing"
              className="w-full border p-2 rounded"
              value={formData.facing}
              onChange={handleInputChange}
              onFocus={() => setShowFacingDropdown(true)}
              placeholder="Select facing direction"
            />
            
            {showFacingDropdown && filteredFacing.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                {filteredFacing.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFormData({...formData, facing: item});
                      setShowFacingDropdown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Set a Price */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Set a Price (Rs.) *</label>
          <div className="flex items-center border rounded p-2">
            <span className="mr-2 text-gray-500">₹</span>
            <input
              type="text"
              name="price"
              className="w-full outline-none"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>
        </div>

        {/* Ad Title */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Ad Title *</label>
          <input
            type="text"
            name="adTitle"
            className="w-full border p-2 rounded"
            value={formData.adTitle}
            onChange={handleInputChange}
            placeholder="Enter ad title"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded h-32"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>

        {/* Upload Photos */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Upload Up to 20 Photos *</label>
          <div className="grid grid-cols-4 gap-2">
            <label className="border p-6 flex items-center justify-center cursor-pointer">
              <input type="file" className="hidden" onChange={handlePhotoUpload} />
              <span className="text-gray-500">+ Add Photo</span>
            </label>
            {photos.map((photo, index) => (
              <img key={index} src={photo.preview} alt="Uploaded" className="border p-1 w-full h-24 object-cover" />
            ))}
          </div>

        </div>

        {/* Confirm Location */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">CONFIRM YOUR LOCATION</h2>
          <div className="relative">
            <label className="block mt-2">State *</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.state}
onChange={handleInputChange}
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
                      setFormData({...formData, state: item})
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold">REVIEW YOUR DETAILS</h2>
          <label className="block mt-2">Name</label>
          <input type="text" className="w-full border p-2 rounded" name="name" value={formData.name} onChange={handleInputChange} />

          <label className="block mt-2">Mobile Phone Number *</label>
          <input type="text" className="w-full border p-2 rounded" name="phone" value={formData.phone} onChange={handleInputChange}/>
        </div>
            {/* Error message - add it here */}
{error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {/* Submit Button */}
<div className="mt-6">
  <button
    className="w-full mt-6 bg-blue-600 text-white py-2 rounded"
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading ? "Posting..." : "Post Ad"}
  </button>
</div>

        </form>
        {showLoadingPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Posting Your Ad</h2>
        <p className="text-gray-600 text-center">
          Please wait while we process your ad. This will just take a moment...
        </p>
      </div>
    </div>
  </div>
)}

      </div>
  );
}
