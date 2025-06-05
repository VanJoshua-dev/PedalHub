import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import BreadCurmb from "./BreadCurmb";
import { getAllOrders } from "../utils/fetcher";

function OrdersMain() {
  const allOrders = getAllOrders();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch = order.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (mode, order = null) => {
    setModalMode(mode);
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <BreadCurmb text1="Home" text2="Orders" />

      <div className="mt-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold">All Orders</h2>

          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search by customer"
              className="border border-gray-300 px-2 py-1 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="border border-gray-300 px-2 py-1 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => openModal("add")}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
             + Add Order
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2" colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.orderID || index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order.orderID}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2 max-w-50">{order.itemName}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">₱{order.total}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td
                      className={`px-4 py-2 ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal("edit", order)}
                        title="Edit order"
                        className="w-full h-full p-2 flex items-center justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                      >
                        <FaRegEdit size={20} />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal("delete", order)}
                        title="Delete order"
                        className="w-full h-full p-2 flex items-center justify-center bg-red-500 text-white rounded-sm hover:bg-red-600"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-4 capitalize">
              {modalMode} Order
            </h3>
            {modalMode === "delete" ? (
              <>
                <p>
                  Are you sure you want to delete <strong>Order ID: {selectedOrder?.orderID}</strong>?
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-1 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <form className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Customer"
                  defaultValue={selectedOrder?.customer || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Items"
                  defaultValue={selectedOrder?.itemName || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  defaultValue={selectedOrder?.quantity || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Total"
                  defaultValue={selectedOrder?.total || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Status"
                  defaultValue={selectedOrder?.status || ""}
                  className="border px-3 py-1 rounded"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-1 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-blue-600 text-white rounded"
                  >
                    {modalMode === "edit" ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersMain;
