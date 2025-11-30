import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import AddProductModal from "./modals/add-new-product-modal";
function ProductHeader({ filterData, onFilterChange, isFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value });
    isFilter();
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    onFilterChange({ brand: e.target.value });
    isFilter();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({ category: e.target.value });
    isFilter();
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange({ status: e.target.value });
    isFilter();
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setStatus("");

    onFilterChange({
      search: "",
      brand: "",
      category: "",
      status: "",
    });
  };

  //Handle modals
  const [addNewProduct, setAddNewProduct] = useState(false);

  return (
    <div className="w-full h-20 px-7 flex flex-row items-center justify-between bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] ">
      <div className="flex flex-row gap-2 justify-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by prod. name"
          className="py-2 px-3 border rounded-sm"
        />
      </div>

      {/**
       * Filter Bar
       */}
      <div className="flex items-center gap-2">
        <IoFilterSharp size={25} />
        <div className="flex items-center gap-1">
          <h1>Category:</h1>
          <select
            value={category}
            onChange={handleCategoryChange}
            name="category"
            className="w-full px-4 py-1 rounded-sm border border-gray-300 bg-white 
           text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500 shadow-sm cursor-pointer"
          >
            <option value="">All</option>

            {Array.isArray(filterData?.categories) &&
            filterData.categories.length > 0 ? (
              filterData.categories.map((cat, index) => (
                <option key={cat.id || index} value={cat.slug}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <h1>Brand:</h1>
          <select
            value={brand}
            onChange={handleBrandChange}
            name="status"
            className="w-30 px-4 py-1 rounded-sm border border-gray-300 bg-white 
           text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500 shadow-sm cursor-pointer"
          >
            <option value="">All</option>

            {Array.isArray(filterData?.brands) &&
            filterData.brands.length > 0 ? (
              filterData.brands.map((brand, index) => (
                <option key={index} value={brand.brand}>
                  {brand.brand}
                </option>
              ))
            ) : (
              <option disabled>No brands available</option>
            )}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <h1>Status:</h1>
          <select
            value={status}
            onChange={handleStatusChange}
            name="status"
            className="w-30 px-4 py-1 rounded-sm border border-gray-300 bg-white 
           text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500 shadow-sm cursor-pointer"
          >
            <option value="">All</option>
            <option value="In+Stock">In Stock</option>
            <option value="Low+Stock">Low Stock</option>
            <option value="No+Stock">No Stock</option>
          </select>
        </div>

        <button
          onClick={handleClearFilters}
          className="py-1 px-5 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 cursor-pointer rounded-sm"
        >
          Clear Filter
        </button>
      </div>

      <div>
        {/**
         * When this is clicked it shows a modal for adding a product
         */}
        <button
          onClick={() => setAddNewProduct(true)}
          className="py-2 px-3 bg-[#0A1727] hover:bg-blue-700 transition-colors duration-300 cursor-pointer text-white rounded-sm"
        >
          + Add new product
        </button>
      </div>
      {addNewProduct && (
        <AddProductModal
          isOpen={addNewProduct}
          onClose={() => setAddNewProduct(false)}
          categories={filterData.categories}
        />
      )}
    </div>
  );
}

export default ProductHeader;
