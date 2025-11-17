import React, { useState, useEffect } from "react";
import productData from "../data/products.json";
import BreadCurmb from "./BreadCurmb";
import { getAllItems } from "../utils/fetcher";
import Modal from "../adminModals/ProductFormModal";

function ProductsMain() {
  const products = getAllItems(productData);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 9;

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
    <div className="min-h-screen flex flex-col gap-1 px-4">
      <BreadCurmb text1="Home" text2="Products" />

      {/* Filters */}
      <div className=" flex flex-col  sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">All Products</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-full sm:w-60 bg-white shadow-sm"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2 bg-white shadow-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => openModal("add")}
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-4">
        {paginatedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white h-85 border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-20 object-contain mb-3"
            />

            <h3 className="font-bold text-md line-clamp-1">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.description}
            </p>

            <p className="text-xs text-gray-500 italic mt-1">
              Category: {item.categoryName}
            </p>

            <p className="mt-2 font-semibold text-blue-600 text-sm">
              ₱{item.price}
            </p>

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

            <div className="flex gap-2 mt-4 text-sm">
              <button
                className="px-3 py-1 bg-gray-100 border rounded hover:bg-gray-200"
                onClick={() => openModal("edit", item)}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 bg-red-100 text-red-600 border rounded hover:bg-red-200"
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
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded bg-white shadow disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border shadow ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded bg-white shadow disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsMain;
