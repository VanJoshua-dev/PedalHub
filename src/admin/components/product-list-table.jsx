import React, { useState } from "react";
import Swal from "sweetalert2";
//icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditProductModal from "./modals/edit-product-modal";
import { useDeleteProduct } from "../../services/products-services";
function ProductListTable({ products, isFilter }) {
  const handleViewImage = (product) => {
    Swal.fire({
      imageUrl: `http://localhost:5000/${product.Image}`,
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: product.Name,
      showConfirmButton: true,
      confirmButtonText: "Close",
    });
  };
  const { handleDelete } = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="w-full h-full flex flex-row bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)]">
      {/* Rounded outer wrapper */}
      {Array.isArray(products?.products) && products.products.length > 0 && (
        <div className="relative w-full overflow-auto bg-neutral-primary-soft shadow-xs rounded-xl h-[500px] scrollbar-hidden">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-white text-body bg-[#0A1727] sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Base Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  colSpan={2}
                  className="px-6 py-3 text-center font-medium"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {products.products.map((product, index) => (
                <tr
                  key={product.id || index}
                  className="bg-neutral-primary border-b border-default"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 w-50 font-medium text-heading whitespace-nowrap"
                  >
                    <img
                      onClick={() => handleViewImage(product)}
                      src={`http://localhost:5000/${product.Image}`}
                      alt={product.Name}
                      className="w-30 h-30 object-cover rounded-sm hover:scale-105 transition-transform duration-300 cursor-pointer shadow"
                    />
                  </td>
                  <td className="px-6 py-4">{product.Name}</td>
                  <td className="px-6 py-4 w-20">{product.Description}</td>
                  <td className="px-6 py-4">{product.Brand}</td>
                  <td className="px-6 py-4">{product.CategoryName}</td>

                  <td className="px-6 py-4 w-40">₱{product.BasePrice}</td>
                  <td className="px-6 py-4">{product.TotalStock}</td>
                  <td className="px-6 py-4 w-40">
                    {product.Status === "In Stock" && (
                      <span className="py-2 px-2 bg-green-600 rounded-full text-white">
                        {product.Status}
                      </span>
                    )}

                    {product.Status === "Low Stock" && (
                      <span className="py-2 px-2 bg-amber-400 rounded-full text-white">
                        {product.Status}
                      </span>
                    )}

                    {product.Status === "No Stock" && (
                      <span className="py-2 px-2 bg-red-400 rounded-full text-white">
                        {product.Status}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="py-2 px-2 bg-green-400 text-white flex items-center justify-center rounded-sm hover:bg-green-600 cursor-pointer transition-colors duration-300"
                    >
                      <FaEdit size={20} />
                    </button>
                  </td>
                  <td className="px-3 py-4">
                    <button
                      onClick={() =>
                        handleDelete(product.productId, product.Name)
                      }
                      className="py-2 px-2 bg-red-400 text-white flex items-center justify-center rounded-sm hover:bg-red-600 cursor-pointer duration-300"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {Array.isArray(products?.products) &&
        products.products.length < 1 &&
        isFilter === false && (
          <div className="w-full text-center py-2  text-xl font-medium">
            No products yet
          </div>
        )}

      {Array.isArray(products?.products) &&
        products.products.length < 1 &&
        isFilter === true && (
          <div className="w-full text-center py-2  text-xl font-medium">
            No product matched
          </div>
        )}

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          categories={products.categories}
          onClose={() => setSelectedProduct(null)}
          onSave={(updated) => console.log("Updated product:", updated)}
        />
      )}
    </div>
  );
}

export default ProductListTable;
