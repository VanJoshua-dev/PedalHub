import React, { useEffect, useState } from "react";
import Img from "../assets/categorySample.png";
import { MdOutlineCategory } from "react-icons/md";
import {getCategories} from "../utils/fetcher";
import products from "../data/products.json";
function Categories() {
  const categories = getCategories(products);
  return (
    <div className="w-full flex flex-row justify-center">
      <div className="shadow w-300 p-2">
        <h1 className="border-b-2 py-5 flex flex-row gap-1 border-gray-300 text-xl">
          🗂️ Categories
        </h1>
        <div className="p-1 flex flex-row gap-1">
          {/* card */}

          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-30 h-40 shadow p-1 rounded-sm hover:bg-gray-100"
            >
              <img src={category.categoryImage} alt={category.categoryName} className="w-25" />
              <p className="text-center text-sm mt-2 ">{category.categoryName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
