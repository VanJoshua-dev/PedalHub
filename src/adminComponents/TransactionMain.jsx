import React, { useState } from "react";
import BreadCurmb from "./BreadCurmb";
import { getAllTransactions } from "../utils/fetcher";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function TransactionMain() {
  const allTransactions = getAllTransactions();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'delete'
  const [selectedTnx, setSelectedTnx] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const openModal = (mode, txn = null) => {
    setModalMode(mode);
    setSelectedTnx(txn);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTnx(null);
  };

  // Filter logic
  const filteredTransactions = allTransactions.filter((txn) => {
    const matchesSearch = txn.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <BreadCurmb text1="Home" text2="Transactions" />

      <div className="mt-4">
        {/* Header and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold">All Transactions</h2>

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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => openModal("add")}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
             + Add Transaction
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn, index) => (
                  <tr
                    key={txn.transactionID || index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{txn.transactionID}</td>
                    <td className="px-4 py-2">{txn.customer}</td>
                    <td className="px-4 py-2">₱{txn.amount}</td>
                    <td className="px-4 py-2">{txn.paymentMethod}</td>
                    <td className="px-4 py-2">{txn.date}</td>
                    <td
                      className={`px-4 py-2 ${
                        txn.status === "Completed"
                          ? "text-green-600"
                          : txn.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.status}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal("edit", txn)}
                        title="Edit transaction"
                        className="w-full h-full p-2 flex items-center justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                      >
                        <FaRegEdit size={20} />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal("delete", txn)}
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
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-4 capitalize">
              {modalMode} Transaction
            </h3>

            {modalMode === "delete" ? (
              <>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>Transaction ID: {selectedTnx?.transactionID}</strong>?
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
                  defaultValue={selectedTnx?.customer || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  defaultValue={selectedTnx?.amount || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Payment Method"
                  defaultValue={selectedTnx?.paymentMethod || ""}
                  className="border px-3 py-1 rounded"
                />
                <select
                  defaultValue={selectedTnx?.status || "Pending"}
                  className="border px-3 py-1 rounded"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
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

export default TransactionMain;
