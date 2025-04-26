import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RentRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Trigger popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true); // Show the modal after 3 seconds
    }, 2000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Close the modal
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose} // Close when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center w-3/4 max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <h1 className="text-3xl font-bold mb-4">Owner Approval ✅</h1>
            <p className="text-lg text-gray-700 mb-4">
              Your request has been sent to the owner. Once approved, you will receive further details via email Id for confirmation.
            </p>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/main")}
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RentRequest;