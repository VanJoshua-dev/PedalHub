import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    navigate("/shop");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, idx) => (
              <li key={idx} className="border-b pb-2">
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₱{item.price} x {item.quantity} = ₱{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total: ₱{total.toFixed(2)}</p>
            <button
              onClick={handlePlaceOrder}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Place Order
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;