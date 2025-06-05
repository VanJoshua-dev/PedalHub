import React from "react";
import sampleProfile from "../assets/sampleProfile.png";

import {useNavigate} from 'react-router-dom'
//logo
import logo from "../assets/Logo.png";

//icons
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdHelpCenter } from "react-icons/md";
function Profile() {
  return (
    <div className="flex flex-row items-center gap-1 text-white">
      <img className="w-10" src={sampleProfile} alt="" />
      <h4>Meinard</h4>
    </div>
  );
}

function Header() {

  const navigate = useNavigate()
  return (
    <div className="w-full p-5   bg-gray-900">
      <div className="w-full flex flex-row justify-between items-center cursor-pointer">
        <div>
          <a href="" className="text-white flex flex-row items-center gap-1"><MdHelpCenter size={20} />
 Help center</a>
        </div>
        {/* Profile */}
        <Profile />
      </div>

      <div className="w-full mt-5  flex flex-row justify-evenly px-10 items-center">
        <div className="flex items-center">
          <img
          onClick={() => navigate("/home")}
          src={logo}
          alt=""
          className="w-35"
        />
        </div>
        <div className="">
          <form action="" className=" p-1 flex flex-row items-center gap-2">
             <input 
            className="bg-white w-200 rounded-sm border-2 border-gray-200 p-2" 
            type="search"
            placeholder="Search item"
            name="" 
            id="" />
            <button className="py-2  px-5  text-black bg-white rounded-sm hover:bg-gray-500"><IoIosSearch size={26}/></button>
          </form>
         
        </div>

        <div>
          <button className="text-white p-1  rounded-md hover:bg-gray-500">
            <IoCartOutline size={40}/>
          </button>
            
        </div>
      </div>
    </div>
  );
}

export default Header;
