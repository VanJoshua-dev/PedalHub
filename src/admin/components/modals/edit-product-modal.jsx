import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import clx from "clsx";
import { useEditproduct } from "../../../services/products-services";

function EditProductModal({ product, onClose, onSave, categories }) {
  const fileInputRef = useRef(null);

  const {
    loading,
    productName,
    setProductName,
    brand,
    setBrand,
    categoryId,
    setCategoryId,
    basePrice,
    setBasePrice,
    description,
    setDescription,
    stock,
    setStock,
    image,
    setImage,
    handleSubmit,
  } = useEditproduct(product, onSave, onClose);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    timer: 2000,
    showConfirmButton: false,
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Toast.fire({ icon: "warning", title: "Invalid image" });
      return;
    }

    setImage({ file, url: URL.createObjectURL(file) });
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Toast.fire({ icon: "warning", title: "Invalid image" });
      return;
    }

    setImage({ file, url: URL.createObjectURL(file) });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-[99] px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl relative flex flex-col max-h-[90vh]">
        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 p-6 pb-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={22} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 pt-0 scrollbar-hidden"
        >
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Product Image</label>

            <div
              className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <FiUploadCloud size={35} className="text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag & drop image here or click to upload
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {/* Modern Image Preview */}
            {(image || product?.Image) && (
              <div className="mt-4 flex justify-center">
                <div className="relative group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <img
                    src={image?.url || `http://localhost:5000/${product.Image}`}
                    className="w-48 h-48 object-cover rounded-2xl"
                    alt="Product Preview"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="bg-red-500 z-[99] text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                      }}
                      title="Remove image"
                      type="button"
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                  {/* Subtle border or effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-300"></div>
                </div>
              </div>
            )}
          </div>

          {/* Basic Product Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-medium mb-2">
                Product Name <sup className="text-red-400">*</sup>
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">
                Brand <sup className="text-red-400">*</sup>
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">
                Category <sup className="text-red-400">*</sup>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categories?.map((category, index) => (
                  <option key={category.id || index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">
                Base Price <sup className="text-red-400">*</sup>
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="₱ 0.00"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Product Description <sup className="text-red-400">*</sup>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Stock <sup className="text-red-400">*</sup>
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Enter stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className={clx(
              "w-full text-white py-3 rounded-xl mt-4 transition-colors duration-300",
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                <span>Saving changes...</span>
              </div>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
