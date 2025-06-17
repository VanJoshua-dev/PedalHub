import React from "react";
import { useNavigate } from "react-router-dom";

function ViewItem({ item, onClose }) {
  const navigate = useNavigate();

  // Add to Cart Handler (using localStorage or your API/cart logic)
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Item added to cart!");
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { item } });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold"
        >
          ✕
        </button>
        <img src={item.image} alt={item.name} className="w-full h-48 object-contain mb-4" />
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-lg mt-2 mb-4">₱{item.price}</p>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;
