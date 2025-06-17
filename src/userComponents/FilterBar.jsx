function FilterBar({
  availability,
  setAvailability,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  productType,
  setProductType,
  sortBy,
  setSortBy,
  allProductsCount,
  filteredCount,
}) {
  return (
    <div className="min-w-[250px] space-y-4 border-r pr-4 px-4">
      <h1 className="text-2xl font-semibold border-b py-2">Filter</h1>

      <div>
        <label className="block text-sm font-medium">Availability</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="">All</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-20 border px-2 py-1"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-20 border px-2 py-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Product Type</label>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="">All</option>
          <option value="Bicycles">Bicycles</option>
          <option value="BikeFrames">Bike Frames</option>
          <option value="ProtectedGears">Protected Gears</option>
          <option value="Chains">Chains</option>
          <option value="Saddles">Saddles</option>
          <option value="Handlebars">Handlebard</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <p className="text-xs text-gray-500">
        Showing {filteredCount} of {allProductsCount} items
      </p>
    </div>
  );
}

export default FilterBar;
