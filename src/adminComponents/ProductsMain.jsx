import React, { useState, useEffect } from "react";
import productData from "../data/products.json";
import BreadCurmb from './BreadCurmb';
import { getAllItems } from "../utils/fetcher";
import Modal from "../adminModals/ProductFormModal"; // You can create a separate modal component if needed

function ProductsMain() {
  const products = getAllItems(productData);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 6;

  const categories = [
    "All",
    ...new Set(products.map((item) => item.categoryName)),
  ];

  const filteredItems = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.categoryName === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <BreadCurmb text1="Home" text2="Products" />
      <div className="mt-4">
      
        {/* Filters */}
        <div className="flex flex-row items-center justify-between w-full gap-2">
           <h2 className="text-xl w-100 font-semibold mb-4">All Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1 w-full sm:w-60"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => openModal("add")}
            className=" bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 h-111 overflow-y-auto">
        {paginatedItems.map((item) => (
          <div
            key={item.id}
            className="border rounded shadow-sm hover:shadow-md p-4 bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-contain rounded mb-2"
            />
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{item.description}</p>
            <p className="text-sm text-gray-500 italic">
              Category: {item.categoryName}
            </p>
            <p className="mt-2 font-semibold text-blue-600">₱{item.price}</p>
            <p className="text-sm">
              Stock:{" "}
              <span
                className={item.stock > 0 ? "text-green-600" : "text-red-600"}
              >
                {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
              </span>
            </p>
            <div className="flex gap-1 mt-2 text-xs">
              {item.isTop && (
                <span className="bg-yellow-200 px-2 py-0.5 rounded">Top</span>
              )}
              {item.isNew && (
                <span className="bg-green-200 px-2 py-0.5 rounded">New</span>
              )}
            </div>

            <div className="flex gap-2 mt-3 text-sm">
              <button
                className="px-2 py-1 bg-gray-100 border rounded hover:bg-gray-200"
                onClick={() => openModal("edit", item)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-100 text-red-600 border rounded hover:bg-red-200"
                onClick={() =>
                  alert(
                    "Are you sure you want to delete this item? \nItem Name: " +
                      item.name
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          mode={modalMode}
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default ProductsMain;
