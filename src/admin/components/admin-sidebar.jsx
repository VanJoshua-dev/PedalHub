import React from "react";

import clsx from "clsx";
//logo
import logo from "../../assets/Logo.png";

import { useLocation, useNavigate } from "react-router-dom";
//icons
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

function AdminSideBar() {
  const location = useLocation();

  //handle page navigation
  const navigate = useNavigate();
  const tabs = [
    {
      label: "Dashboard",
      icon: <MdOutlineDashboard size={20} />,
      link: "/dashboard",
    },
    {
      label: "Transactions",
      icon: <GrTransaction size={20} />,
      link: "/dashboard/transactions",
    },
    {
      label: "Orders",
      icon: <LuClipboardList size={20} />,
      link: "/dashboard/orders",
    },
    {
      label: "Products",
      icon: <BsBoxSeam size={20} />,
      link: "/dashboard/products",
    },
    {
      label: "Users",
      icon: <LuUsersRound size={20} />,
      link: "/dashboard/users",
    },
  ];
  return (
    <div className="bg-[#0A1727] flex flex-col justify-between h-full">
      <header className="w-full py-5 flex border-b-2 border-gray-500 justify-center items-center">
        <img className="h-25" src={logo} alt="PedalHub-Logo" />
      </header>
      <div className="w-full h-full ">
        <ul className="w-full flex flex-col gap-1 px-5 py-5">
          {tabs.map((tab, index) => (
            <li
              onClick={() => navigate(tab.link)}
              className={clsx(
                "text-white flex flex-row gap-2 items-center text-lg py-2 px-2 cursor-pointer rounded-md hover:bg-gray-800 transition-colors duration-300",
                location.pathname === tab.link && "bg-gray-800"
              )}
              key={index}
            >
              {tab.icon}
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div className=" text-black flex justify-end bg-gray-900">
        <button
          className="w-full h-15 cursor-pointer border-t-2 border-gray-500 text-white flex flex-row items-center gap-2 justify-center transition-colors duration-300 hover:bg-gray-800"
          onClick={() => navigate("/login")}
        >
          <MdOutlineLogout size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSideBar;
