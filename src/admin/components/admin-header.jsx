import React from "react";
import profile from "../../assets/sampleProfile.png";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function AdminHeader() { // Assuming user is stored as JSON object
  const location = useLocation();

  const getTitle = (pathname) => {
    const titleMap = {
      "/dashboard": "Dashboard",
      "/dashboard/products/categories": "Product Categories",
      "/dashboard/orders": "Orders",
      "/dashboard/products": "Products",
      "/dashboard/sales": "Sales",
      "/dashboard/customers": "Customers",
    };
    return titleMap[pathname] || "Admin Panel";
  };

  return (
    <div className="w-full h-full flex justify-between items-center py-3 px-3 shadow">
     
      {/* Dynamic Title */}
      <h1 className="text-3xl font-semibold">{getTitle(location.pathname)}</h1>

      {/* User Profile */}
      <div className="flex items-center justify-center gap-2">
        <img src={profile} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">{"Van Joshua"}</p>
          <p className="text-sm text-blue-400">{"System Admin"}</p>
        </div>
        
      
      </div>
    </div>
  );
}

export default AdminHeader;
