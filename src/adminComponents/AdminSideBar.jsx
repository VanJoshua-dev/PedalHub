import React from 'react'

import clsx from 'clsx'
//logo
import logo from '../assets/Logo.png'

import {useLocation,useNavigate} from 'react-router-dom'
//icons
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
function AdminSideBar() {

    //handle checking location
    const location = useLocation();

    //handle page navigation
    const navigate = useNavigate()
    const tabs = [
        {label: "Dashboard", icon: <MdOutlineDashboard />, link: "/dashboard",},
        {label: "Transactions", icon: <GrTransaction />, link: "/transactions"},
        {label: "Orders", icon: <LuClipboardList />, link: "/orders"},
        {label: "Products", icon: <BsBoxSeam />, link: "/products"},
        {label: "Users", icon: <LuUsersRound />, link: "/users"},
    ]
  return (
    <div className='bg-[#0A1727] h-full'>
      <header className='w-full h-35 flex border-b-2 border-gray-500 justify-center items-center'>
            <img
            className='w-30'
            src={logo} alt="PedalHub-Logo" />
      </header>
      <div className='w-full h-full'>
            <ul className='w-full h-128 flex flex-col gap-1 px-5 py-5'>
                {tabs.map((tab, index) => (
                    <li
                    onClick={() => navigate(tab.link)}
                    className={clsx('text-white flex flex-row gap-2 items-center text-lg py-2 px-2 cursor-pointer hover:bg-gray-800', location.pathname === tab.link && "bg-gray-800")} 
                    key={index}>
                        {tab.icon} 
                        {tab.label}
                    </li>
                ))}
                
            </ul>
            <div className='w-full relative h-full text-black flex justify-end bg-gray-900'>
                <button className='w-full h-15 border-t-2 border-gray-500 text-white flex flex-row items-center gap-2 justify-center hover:bg-gray-800' onClick={() => navigate("/login")}><MdOutlineLogout size={20}/>Logout</button>
            </div>
      </div>
    </div>
  )
}

export default AdminSideBar
