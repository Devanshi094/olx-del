import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    items: [],
    totalAmount: 0,
    shippingAddress: "",
    paymentMethod: "",
    estimatedDelivery: ""
  });

  useEffect(() => {
    // Generate random order ID
    const generateOrderId = () => {
      const prefix = "OLX";
      const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      const timestamp = new Date().getTime().toString().slice(-4);
      return `${prefix}-${randomNum}-${timestamp}`;
    };

    // Get cart items and delivery details from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails")) || {};
    
    // Calculate total amount
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const shippingCost = cartItems.length * 100; // ₹100 per item
    const total = subtotal + shippingCost;
    
    // Format address
    const address = deliveryDetails.address ? 
      `${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.state}, ${deliveryDetails.pincode}` : 
      "Address not available";
    
    // Get payment method
    const paymentMethod = localStorage.getItem("paymentMethod") || "Not specified";
    
    // Calculate estimated delivery date (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Set order details
    setOrderDetails({
      orderId: generateOrderId(),
      items: cartItems,
      totalAmount: total,
      shippingAddress: address,
      paymentMethod: paymentMethod,
      estimatedDelivery: formattedDeliveryDate
    });
    
    // Trigger confetti effect
    triggerConfetti();
  }, []);
  
  // Function to trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <button onClick={() => navigate("/main")} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-center text-[#183056]">
          Order Confirmation
        </h1>
        <div className="w-10"></div> {/* Empty div for balanced spacing */}
      </div>
      
      <div className="max-w-4xl mx-auto p-6 my-8">
        {/* Success Message */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-green-200 mb-8">
          <div className="flex flex-col items-center text-center mb-6">
            <CheckCircle size={80} className="text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold">{orderDetails.orderId}</span>
            </div>
          </div>
          
          {/* Order Timeline */}
          <div className="relative mb-8">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-green-200"></div>
            
            <div className="flex items-start mb-6 relative">
              <div className="bg-green-500 rounded-full p-2 z-10">
                <CheckCircle size={24} className="text-white" />
              </div>
              <div className="ml-6">
                <h3 className="font-semibold">Order Confirmed</h3>
                <p className="text-sm text-gray-500">Your order has been placed</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6 relative">
              <div className="bg-gray-200 rounded-full p-2 z-10">
                <Package size={24} className="text-gray-500" />
              </div>
              <div className="ml-6">
                <h3 className="font-semibold">Processing</h3>
                <p className="text-sm text-gray-500">We&apos;re preparing your order</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6 relative">
              <div className="bg-gray-200 rounded-full p-2 z-10">
                <Truck size={24} className="text-gray-500" />
              </div>
              <div className="ml-6">
                <h3 className="font-semibold">Shipping</h3>
                <p className="text-sm text-gray-500">Your order is on the way</p>
              </div>
            </div>
            
            <div className="flex items-start relative">
              <div className="bg-gray-200 rounded-full p-2 z-10">
                <Home size={24} className="text-gray-500" />
              </div>
              <div className="ml-6">
                <h3 className="font-semibold">Delivery</h3>
                <p className="text-sm text-gray-500">Estimated by {orderDetails.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Order Details</h2>
          
          {/* Items */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Items</h3>
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center">
                  <img 
                    src={item.images?.[0] || item.image} 
                    alt={item.title || item.name} 
                    className="w-16 h-16 object-contain rounded mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.title || item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                  </div>
                </div>
                <p className="font-medium">₹{item.price * (item.quantity || 1)}</p>
              </div>
            ))}
          </div>
          
          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
            <p className="text-gray-600">{orderDetails.shippingAddress}</p>
          </div>
          
          {/* Payment Information */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
            <p className="text-gray-600">{orderDetails.paymentMethod}</p>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{orderDetails.totalAmount - (orderDetails.items.length * 100)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping ({orderDetails.items.length} items):</span>
              <span>₹{orderDetails.items.length * 100}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{orderDetails.totalAmount}</span>
            </div>
          </div>
          
          {/* Continue Shopping Button */}
          <button
            onClick={() => navigate("/main")}
            className="w-full mt-6 bg-[#183056] hover:bg-[#0f1e36] text-white p-4 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
