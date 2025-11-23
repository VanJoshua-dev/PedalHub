import React from "react";
import { Outlet } from "react-router-dom";

/**
 * Components
 *
 */
import AdminSideBar from "../components/admin-sidebar";
import AdminHeader from "../components/admin-header";
// import AdminBreadCrumb from "../components/admin-breadcrumb";

function Main() {
  return (
    <div className="grid grid-cols-8 grid-rows-5 gap-0 h-screen w-screen">
      <div className="row-span-5 bg-gray-500">
        <AdminSideBar />
        
      </div>
      <div className="col-span-7 row-span-5">
        <header>
          <AdminHeader />
        </header>
          {/* <AdminBreadCrumb /> */}
        <main className="px-5 py-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Main;
