import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from '../assets/Logo.png'
function Footer() {
  return (
    <div className="w-full justify-center items-center mt-1 h-60">
      <div className="w-full h-full p-5 bg-gray-900 text-white flex flex-col justify-between">
        {/* Top Row */}
        <div className="flex justify-between flex-wrap gap-4">
          {/* Logo/Brand */}
          <div>
            <img src={logo} alt="" className="w-40" />
            <p className="text-sm text-gray-400">
              Your trusted online bike shop.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <ul className="text-sm space-y-1">
              <li><a href="/shop" className="hover:underline">Home</a></li>
              <li><a href="/cart" className="hover:underline">Cart</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-semibold mb-2">Contact</h2>
            <p className="text-sm">Email: support@bikestore.com</p>
            <p className="text-sm">Phone: +63 912 345 6789</p>
            <p className="text-sm">Location: Manila, Philippines</p>
          </div>

          {/* Socials */}
          <div>
            <h2 className="font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-3 text-lg">
              <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="text-center flex flex-row justify-center items-center text-xs text-gray-500 border-t border-gray-700 mt-4 pt-2">
          © {new Date().getFullYear()} <img src={logo} alt="" className="w-15"/>. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
