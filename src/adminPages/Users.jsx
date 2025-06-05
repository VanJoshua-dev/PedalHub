import React from 'react'
import AdminSideBar from "../adminComponents/AdminSideBar";
import AdminHeader from "../adminComponents/AdminHeader";
import UsersMain from '../adminComponents/UsersMain';
function Users() {
  return (
     <div className="w-screen h-screen flex">
        <aside className="w-64 h-full bg-gray-100">
        <AdminSideBar />
        </aside>

        <div className="flex-1 h-full bg-[#E9EDF8] p-4 overflow-y-auto">
        <header className="mb-4 w-full bg-white h-14 flex jutify-center px-3 items-center">
            <AdminHeader />
        </header>
        <main className="w-full">
            <UsersMain />
        </main>
        </div>
    </div>
  )
}

export default Users
