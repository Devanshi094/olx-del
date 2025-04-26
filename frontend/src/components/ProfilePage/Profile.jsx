import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Camera, Save, X } from "lucide-react";
import useAuth from "../../context/useAuth";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import axios from "axios"; // Add axios for API calls

const Profile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const profileFetched = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });

  // Memoize fetchUserProfile with useCallback
  const fetchUserProfile = useCallback(async (userId) => {
    try {
      setLoading(true);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      // Log for debugging
      console.log("Fetching profile with token:", token ? "Token exists" : "No token");
      console.log("User ID:", userId);
      
      // Include the token in the request headers
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        setProfileData({
          username: response.data.username || user?.username || user?.name || "",
          email: response.data.email || user?.email || "",
          phone: response.data.phone || "",
          location: response.data.location || "",
          bio: response.data.bio || ""
        });
        
        const hasChanges = Object.keys(response.data).some(key => 
            response.data[key] !== user[key]
          );
          
          if (hasChanges) {
            login({
              ...user,
              ...response.data
            });
        }
      }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        // More detailed error logging
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      // Fall back to data from auth context
      setProfileData({
        username: user?.username || user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        location: user?.location || "",
        bio: user?.bio || ""
      });
    } finally {
      setLoading(false);
    }
  }, [user, login]);

  useEffect(() => {
    // Initialize form with user data if available
    if (user) {
      console.log("User data loaded in profile:", user);
      
      // If we have a user ID, try to fetch complete profile data
      if (user.id && !profileFetched.current) {
        profileFetched.current = true;
        fetchUserProfile(user.id);
      } else {
        // Otherwise just use what we have from auth context
        setProfileData({
          username: user.username || user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          location: user.location || "",
          bio: user.bio || ""
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user, fetchUserProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        if (user && user.id) {
          // Get the token from localStorage
          const token = localStorage.getItem('token');
          
          // Log the token for debugging (remove in production)
          console.log("Token being sent:", token ? "Token exists" : "No token");
          console.log("Updating user ID:", user.id);
          
          const response = await axios.put(
            `http://localhost:5000/api/users/${user.id}`, 
            profileData,
            {
              headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
              }
            }
          );
        
          if (response.data) {
            // Update the user in context with the updated data
            login({
              ...user,
              ...response.data
            });
            
            setIsEditing(false);
            alert("Profile updated successfully!");
          }
        } else {
          // If no user ID (unlikely), just update local state
          login({
            ...user,
            ...profileData
          });
          
          setIsEditing(false);
          alert("Profile updated successfully!");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        // More detailed error logging
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
        alert("Failed to update profile. Please try again.");
      }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-[#388691]">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Please log in to view your profile</p>
        <Button 
          className="bg-[#388691] hover:bg-[#183056] text-white"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-[#388691] to-[#183056] text-white p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">My Profile</h1>
        <div className="ml-auto">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Edit2 size={18} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#388691] to-[#183056] h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-[#388691] flex items-center justify-center text-white text-5xl font-bold border-4 border-white">
                  {profileData.username ? profileData.username.charAt(0).toUpperCase() : "U"}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#183056] text-white p-2 rounded-full hover:bg-opacity-80 transition-colors">
                    <Camera size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-8">
            <h2 className="text-2xl font-bold text-[#183056]">{profileData.username}</h2>
            <p className="text-gray-500">{profileData.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#183056] mb-6">Profile Information</h3>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-lg focus:ring-[#388691] focus:border-[#388691]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-lg focus:ring-[#388691] focus:border-[#388691]"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-lg focus:ring-[#388691] focus:border-[#388691]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-lg focus:ring-[#388691] focus:border-[#388691]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg focus:ring-[#388691] focus:border-[#388691] p-2"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#388691] hover:bg-[#183056] text-white flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Username</h4>
                    <p className="mt-1 text-lg">{profileData.username || "Not set"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="mt-1 text-lg">{profileData.email || "Not set"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                    <p className="mt-1 text-lg">{profileData.phone || "Not set"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="mt-1 text-lg">{profileData.location || "Not set"}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                  <p className="mt-1">{profileData.bio || "No bio provided"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Account Activity */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#183056] mb-6">Account Activity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-[#388691]">My Ads</h4>
                <p className="text-3xl font-bold mt-2">0</p>
                <button 
                  onClick={() => navigate("/my-ads")}
                  className="mt-3 text-[#183056] hover:underline text-sm"
                >
                  View all ads
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-[#388691]">Wishlist</h4>
                <p className="text-3xl font-bold mt-2">0</p>
                <button 
                  onClick={() => navigate("/wishlist")}
                  className="mt-3 text-[#183056] hover:underline text-sm"
                >
                  View wishlist
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-[#388691]">Messages</h4>
                <p className="text-3xl font-bold mt-2">0</p>
                <button 
                  onClick={() => navigate("/inbox")}
                  className="mt-3 text-[#183056] hover:underline text-sm"
                >
                  View messages
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#183056] mb-6">Account Settings</h3>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate("/settings")}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>Privacy Settings</span>
                <ArrowLeft className="rotate-180" size={18} />
              </button>
              
              <button 
                onClick={() => navigate("/billing")}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>Billing & Payments</span>
                <ArrowLeft className="rotate-180" size={18} />
              </button>
              
              <button 
                onClick={() => navigate("/help")}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>Help & Support</span>
                <ArrowLeft className="rotate-180" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
