import React from 'react'
import AdminSideBar from "../adminComponents/AdminSideBar";
import AdminHeader from "../adminComponents/AdminHeader";
import TransactionMain from '../adminComponents/TransactionMain';
import ProductsMain from '../adminComponents/ProductsMain';
function Products() {
  return (
    <div className="w-screen h-screen flex">
        <aside className="w-64 h-full bg-gray-100">
        <AdminSideBar />
        </aside>

        <div className="flex-1 h-full bg-[#E9EDF8] p-4">
        <header className="mb-4 w-full bg-white h-14 flex jutify-center px-3 items-center">
            <AdminHeader />
        </header>
        <main className="w-full h-70">
            <ProductsMain />
        </main>
        </div>
    </div>
  )
}

export default Products
