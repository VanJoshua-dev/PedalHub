import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdHelpCenter } from 'react-icons/md';

import sampleProfile from '../assets/sampleProfile.png';
import logo from '../assets/Logo.png';

// Icons
import { IoIosSearch } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { MdArrowDropDown } from "react-icons/md";

function Profile() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="relative text-white">
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-row items-center gap-2 cursor-pointer"
      >
        <img className="w-10 h-10 rounded-full border" src={sampleProfile} alt="Profile" />
        <h4>{user}</h4>
        <MdArrowDropDown size={30}/>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/shop?search=${encodeURIComponent(trimmedTerm)}`);
    }
  };

  return (
    <div className="w-full p-5 bg-gray-900">

      <div className="w-full mt-5 flex flex-row justify-evenly px-10 items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={() => navigate('/shop')}
            src={logo}
            alt="Logo"
            className="w-35 cursor-pointer"
          />
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="p-1 flex flex-row items-center gap-2">
          <input
            type="search"
            placeholder="Search item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white w-200 rounded-sm border-2 border-gray-200 p-2"
          />
          <button type="submit" className="py-2 px-5 text-black bg-white rounded-sm hover:bg-gray-500">
            <IoIosSearch size={26} />
          </button>
        </form>

        {/* Cart */}
        <button
          onClick={() => navigate('/cart')}
          className="text-white p-1 rounded-md hover:bg-gray-500"
        >
          <IoCartOutline size={40} />
        </button>
        <Profile />
      </div>
    </div>
  );
}

export default Header;
