import { useEffect, useState } from "react";

function useCategoriesOnly() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/data/products.json") // Ensure the JSON is placed in the `public/data/` folder
      .then((res) => res.json())
      .then((data) => {
        const result = data.map((cat) => ({
          categoryName: cat.categoryName || cat.category, // handle both keys
          categoryImage: cat.categoryImage || "https://via.placeholder.com/100?text=Category", // fallback
        }));
        setCategories(result);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return categories;
}

export default useCategoriesOnly;
