import React, { useState, useEffect } from 'react';

function ProductModal({ mode, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    categoryName: '',
    isTop: false,
    isNew: false,
  });

  useEffect(() => {
    if (mode === 'edit' && product) {
      setFormData(product);
    } else {
      setFormData({
        id: Date.now(), // generate ID
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        categoryName: '',
        isTop: false,
        isNew: false,
      });
    }
  }, [mode, product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.categoryName || !formData.price) {
      alert('Please fill in required fields.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          {mode === 'add' ? 'Add Product' : 'Edit Product'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
          />
          <input
            type="text"
            name="categoryName"
            placeholder="Category"
            value={formData.categoryName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1"
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                name="isTop"
                checked={formData.isTop}
                onChange={handleChange}
              />
              Top
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
              />
              New
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
