import React, { useState } from "react";
import ProductHeader from "../components/products-header";
import ProductListTable from "../components/product-list-table";
import useFetchAllProducts from "../../services/products-services.js";
import Spinner from "../components/spinner-animation";

function ProductList() {
  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    category: "",
    status: "",
  });

  const [isFilter, setIsFilter] = useState(false);

  const { products, loading } = useFetchAllProducts(filters);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="grid grid-cols-5 grid-rows-6 gap-3">
      <div className="col-span-5">
        <ProductHeader
          filterData={products}
          onFilterChange={handleFilterChange}
          isFilter={() => setIsFilter(true)}
        />
      </div>
      <div className="col-span-5 row-span-6 row-start-2">
        <ProductListTable products={products} isFilter={isFilter} />
      </div>
    </div>
  );
}

export default ProductList;
