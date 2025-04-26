import { useState, useEffect } from "react";
import { Trash, Minus, Plus, ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Add quantity property to each item if it doesn't exist
    const itemsWithQuantity = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    
    setCartItems(itemsWithQuantity);
  }, []);

  const updateQuantity = (id, type) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === id) {
        const newQuantity = type === "increase" 
          ? item.quantity + 1 
          : Math.max(1, item.quantity - 1);
          
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    
    // Update localStorage with new quantities
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    
    // Dispatch storage event to update cart count in navbar if needed
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart!");
    
    // Dispatch storage event to update cart count in navbar if needed
    window.dispatchEvent(new Event("storage"));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Calculate shipping cost based on number of unique products
  // Each product costs ₹100 for shipping
  const uniqueProductCount = cartItems.length;
  const shippingCost = uniqueProductCount * 100;

  return (
    <div className="bg-[#ffffff] text-[#183056] min-h-screen">
      {/* Navbar */}
      <div className="flex items-center p-4 bg-white shadow-md w-full">
        <button onClick={() => navigate("/main")} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-bold mx-auto flex items-center gap-4">
          Your Cart <ShoppingCart size={35} />
        </h1>
      </div>

      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md border border-[#183056]">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 border-b">
                  <img 
                    src={item.images?.[0] || item.image} 
                    alt={item.title || item.name} 
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="font-semibold">{item.title || item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item._id, "decrease")} className="p-1 border rounded">
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, "increase")} className="p-1 border rounded">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700">
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md border border-[#183056]">
          <h2 className="text-lg font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping ({uniqueProductCount} {uniqueProductCount === 1 ? 'item' : 'items'}):</span>
            <span>₹{shippingCost}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{totalPrice + shippingCost}</span>
          </div>
          <button
            className="mt-4 w-full bg-[#183056] text-white py-2 rounded-lg hover:bg-[#183056]"
            onClick={() => navigate("/checkout")}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
          
          {/* Added a back to shopping button */}
          <button
            className="mt-2 w-full bg-white text-[#183056] border border-[#183056] py-2 rounded-lg hover:bg-gray-50"
            onClick={() => navigate("/main")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
