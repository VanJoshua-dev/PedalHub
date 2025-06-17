import React, { useState, useEffect, useMemo } from "react";
import Footer from "../userComponents/Footer";
import sampleProfile from "../assets/sampleProfile.png";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import Header from "../userComponents/Header";
import ViewItem from "./ViewItem";
import FilterBar from "../userComponents/FilterBar";
import clx from "clsx";
// Data
import {
  getCategories,
  getTopItems,
  getNewItems,
  getAllItems,
} from "../utils/fetcher";
import products from "../data/products.json";

function HomePage() {
  const navigate = useNavigate()
   useEffect(() => {
       const storedUser = localStorage.getItem("user");
       const storedRole = localStorage.getItem("role");
   
       if (storedUser && storedRole) {
         if (storedRole === "admin") {
           navigate("/dashboard");
         } else if (storedRole === "user") {
           navigate("/shop");
         }
       }
     }, [navigate]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const allItems = useMemo(() => getAllItems(products), []);

  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(allItems);

  const [availability, setAvailability] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    let result = [...allItems];

    if (searchQuery) {
      result = result.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery)
      );
    }

    if (availability === "in") {
      result = result.filter((item) => item.stock > 0);
    } else if (availability === "out") {
      result = result.filter((item) => item.stock === 0);
    }

    if (productType) {
      result = result.filter((item) => item.prodType === productType);
    }

    if (minPrice !== "") {
      result = result.filter((item) => item.price >= parseFloat(minPrice));
    }
    if (maxPrice !== "") {
      result = result.filter((item) => item.price <= parseFloat(maxPrice));
    }

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(result);
  }, [
    searchQuery,
    allItems,
    availability,
    minPrice,
    maxPrice,
    productType,
    sortBy,
  ]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="shrink-0">
        <Header />
      </header>
      <main className="overflow-y-auto grow bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2]">
        <div className="flex flex-row gap-1">
          <FilterBar
            availability={availability}
            setAvailability={setAvailability}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            productType={productType}
            setProductType={setProductType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            allProductsCount={allItems.length}
            filteredCount={filteredItems.length}
          />
          <div className="flex-1">
            <h1 className="px-10 py-2 text-2xl border-b-1 mb-1 flex flex-row gap-2 items-center">
              Products
              <p
                title="Total products"
                className="text-sm bg-white px-2 py-1 rounded shadow"
              >
                {filteredItems.length}
              </p>
            </h1>

            {/* Products Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 h-135  scrollbar-hidden overflow-y-auto px-10">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className={clx(
                    "border shadow-sm hover:shadow-md p-4 bg-white cursor-pointer",
                    item.stock === 0 ? "opacity-50 pointer-events-none" : ""
                  )}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-contain"
                    />
                    <p className="text-center break-all text-sm">{item.name}</p>
                    <p className="text-center text-md font-semibold">
                      ₱{item.price}
                    </p>
                    <p>
                      {" "}
                      {item.stock === 0 ? (
                        <span className="text-red-500">Out of stock</span>
                      ) : (
                        "Stock: " + item.stock
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>

        {selectedItem && (
          <ViewItem item={selectedItem} onClose={handleCloseModal} />
        )}
      </main>
    </div>
  );
}

export default HomePage;
