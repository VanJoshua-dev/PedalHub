import React, { useState } from "react";
import userData from "../data/users.json";
import BreadCurmb from "./BreadCurmb";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
function UsersPage() {
  const users = userData[0].users.filter((user) => !user.isAdmin);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'delete'
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.User.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <BreadCurmb text1="Home" text2="Users" />

      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">All Users</h2>
        <div className="flex flex-row gap-1">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3  py-1 sm:w-60"
          />
          <button
            onClick={() => openModal("add")}
            className=" bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            + Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse  border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2r">Password</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{user.User}</td>
                <td className="px-4 py-2">{user.Pass}</td>
                <td className="px-4 py-2">{user.Email}</td>
                <td className=" px-4 py-2">
                  <button
                    title="Edit User"
                    onClick={() => openModal("edit", user)}
                    className="w-full h-full p-2 flex items-center justify-center bg-green-500 text-white rounded-sm hover:bg-green-600"
                  >
                    <FaRegEdit size={20} />
                  </button>
                </td>
                <td className=" px-4 py-2">
                  <button
                  onClick={() => openModal("delete", user)}
                  title="Delete User"
                  className="w-full h-full p-2 flex items-center justify-center  bg-red-500 text-white rounded-sm hover:bg-red-600">
                    <MdDeleteOutline size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-4 capitalize">
              {modalMode} User
            </h3>
            {modalMode === "delete" ? (
              <>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{selectedUser?.User}</strong>?
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
                  placeholder="Username"
                  defaultValue={selectedUser?.User || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={selectedUser?.Email || ""}
                  className="border px-3 py-1 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  defaultValue={selectedUser?.Pass || ""}
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

export default UsersPage;
