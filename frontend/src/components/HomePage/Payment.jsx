import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [address, setAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load cart items and delivery address from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails")) || {};
    
    setCartItems(storedCart);
    
    // If delivery address is available from previous step, use it
    if (deliveryDetails.address) {
      setAddress(deliveryDetails.address);
    }
    
    // Calculate total amount including shipping
    const subtotal = storedCart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const shippingCost = storedCart.length * 100; // ₹100 per item
    setTotalAmount(subtotal + shippingCost);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    
    try {
      // Validate inputs based on payment method
      if (paymentMethod === 'card') {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
          throw new Error('Please fill in all card details');
        }
        
        // Basic card validation
        if (cardDetails.number.length < 16) {
          throw new Error('Invalid card number');
        }
      } else if (paymentMethod === 'cod') {
        if (!address) {
          throw new Error('Please enter delivery address');
        }
      } else {
        // UPI validation
        if (!upiId || !upiId.includes('@')) {
          throw new Error('Please enter a valid UPI ID');
        }
      }
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart after successful payment
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Show success message
      toast.success('Payment successful! Your order has been placed.');
      
      // Redirect to order confirmation page
      navigate('/order-confirmation');
      
    } catch (error) {
      setPaymentError(error.message);
      toast.error(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <button onClick={() => navigate("/checkout")} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-center text-[#183056]">
          Payment
        </h1>
        <div className="w-10"></div> {/* Empty div for balanced spacing */}
      </div>
      
      <div className="max-w-4xl mx-auto p-6 my-8">
        <form onSubmit={handleSubmit} className="w-full flex flex-col border border-gray-300 rounded-lg shadow-md bg-white p-6">
          {/* Payment Section */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Payment Method Selection */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 md:border-r-2 border-gray-300 pr-0 md:pr-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
              <select 
                className="w-full p-4 text-lg border rounded-lg" 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="gpay">Google Pay</option>
                <option value="paytm">Paytm</option>
                <option value="phonepe">PhonePe</option>
                <option value="cod">Cash on Delivery (COD)</option>
              </select>
            </div>
            
            {/* Payment Details */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 md:border-r-2 border-gray-300 pr-0 md:pr-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
              {paymentMethod === 'card' ? (
                <div className="flex flex-col gap-6">
                  <input 
                    type="text" 
                    placeholder="Card Number" 
                    className="w-full p-4 text-lg border rounded-lg" 
                    value={cardDetails.number} 
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} 
                  />
                  <input 
                    type="text" 
                    placeholder="Expiry Date (MM/YY)" 
                    className="w-full p-4 text-lg border rounded-lg" 
                    value={cardDetails.expiry} 
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} 
                  />
                  <input 
                    type="text" 
                    placeholder="CVV" 
                    className="w-full p-4 text-lg border rounded-lg" 
                    value={cardDetails.cvv} 
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} 
                  />
                  <input 
                    type="text" 
                    placeholder="Card Holder Name" 
                    className="w-full p-4 text-lg border rounded-lg" 
                    value={cardDetails.name} 
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} 
                  />
                </div>
              ) : paymentMethod === 'cod' ? (
                <div className="flex flex-col gap-6">
                  <textarea 
                    placeholder="Confirm Delivery Address" 
                    className="w-full p-4 text-lg border rounded-lg" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    rows="4"
                  />
                  <p className="text-gray-600 text-sm">
                    Cash on delivery will be collected at the time of delivery.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <input 
                    type="text" 
                    placeholder="Enter UPI ID" 
                    className="w-full p-4 text-lg border rounded-lg" 
                    value={upiId} 
                    onChange={(e) => setUpiId(e.target.value)} 
                  />
                  <p className="text-gray-600 text-sm">
                    Please enter your UPI ID in the format yourname@upi
                  </p>
                </div>
              )}
            </div>
            
            {/* Order Summary Section */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount - (cartItems.length * 100)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping ({cartItems.length} items):</span>
                  <span>₹{cartItems.length * 100}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pay Now Button */}
          <div className="w-full mt-8">
            {paymentError && <p className="text-red-500 text-sm mb-2">{paymentError}</p>}
            <button 
              type="submit" 
              disabled={processing} 
              className="w-full bg-[#183056] hover:bg-[#0f1e36] text-white p-4 text-xl rounded-lg disabled:bg-gray-400 transition-colors"
            >
              {processing ? 'Processing...' : paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
