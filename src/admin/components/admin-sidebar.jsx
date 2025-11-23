import React, { useState, useEffect } from "react";
import clsx from "clsx";
import logo from "../../assets/Logo.png";

import { useLocation, useNavigate } from "react-router-dom";

import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdOutlineShoppingCart,
  MdOutlineCategory,
} from "react-icons/md";

import { BsBoxSeam } from "react-icons/bs";
import { LuUsersRound, LuSettings } from "react-icons/lu";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function AdminSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    // auto-open Products dropdown if current path is inside /dashboard/products
    if (location.pathname.startsWith("/dashboard/products")) {
      setOpenDropdown("Products");
    } else {
      // optionally keep other dropdowns closed when not on product routes
      if (openDropdown === "Products") setOpenDropdown(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const tabs = [
    {
      section: null,
      items: [
        {
          label: "Dashboard",
          icon: <MdOutlineDashboard size={20} />,
          link: "/dashboard",
        },
      ],
    },
    {
      section: "Product Management",
      items: [
        {
          label: "Products",
          icon: <BsBoxSeam size={20} />,
          link: "/dashboard/products",
          dropdown: true,
          subRoutes: [
            {
              label: "Categories",
              icon: <MdOutlineCategory size={18} />,
              link: "/dashboard/products/categories",
            },
          ],
        },
      ],
    },
    {
      section: "Orders & Customers",
      items: [
        {
          label: "Orders",
          icon: <MdOutlineShoppingCart size={20} />,
          link: "/dashboard/orders",
        },
        {
          label: "Customers",
          icon: <LuUsersRound size={20} />,
          link: "/dashboard/customers",
        },
      ],
    },
    {
      section: "Settings",
      items: [
        {
          label: "Settings",
          icon: <LuSettings size={20} />,
          link: "/dashboard/settings",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#0A1727] flex flex-col justify-between h-full">
      {/* Logo */}
      <header className="w-full py-5 flex border-b border-gray-500 justify-center items-center">
        <img className="h-25" src={logo} alt="PedalHub-Logo" />
      </header>

      {/* Navigation */}
      <div className="w-full h-full overflow-y-auto">
        {tabs.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-5 py-3">
            {section.section && (
              <p className="text-gray-400 uppercase text-xs mb-2 tracking-wide">
                {section.section}
              </p>
            )}

            <ul className="flex flex-col gap-1">
              {section.items.map((tab, index) => {
                const isActive = location.pathname === tab.link;
                const isDropdownOpen = openDropdown === tab.label;

                return (
                  <div key={index}>
                    {/* Main Item: if dropdown -> navigate + toggle; else just navigate */}
                    <li
                      onClick={() => {
                        if (tab.dropdown) {
                          // navigate to the parent route AND toggle dropdown
                          navigate(tab.link);
                          toggleDropdown(tab.label);
                        } else {
                          navigate(tab.link);
                        }
                      }}
                      className={clsx(
                        "text-white flex flex-row justify-between items-center text-lg py-2 px-2 cursor-pointer rounded-md hover:bg-gray-800 transition-colors duration-300",
                        isActive && "bg-gray-800"
                      )}
                    >
                      <div className="flex flex-row items-center gap-2">
                        {tab.icon}
                        {tab.label}
                      </div>

                      {/* Chevron with rotation */}
                      {tab.dropdown && (
                        <div
                          className={clsx(
                            "transform transition-transform duration-200",
                            isDropdownOpen ? "rotate-180" : "rotate-0"
                          )}
                        >
                          {isDropdownOpen ? (
                            <FiChevronUp size={18} className="text-gray-300" />
                          ) : (
                            <FiChevronDown
                              size={18}
                              className="text-gray-300"
                            />
                          )}
                        </div>
                      )}
                    </li>

                    {/* Dropdown Content (animated height + fade) */}
                    {tab.dropdown && (
                      <ul
                        className={clsx(
                          "ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300",
                          isDropdownOpen
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {tab.subRoutes.map((sub, subIndex) => {
                          const isSubActive = location.pathname === sub.link;

                          return (
                            <li
                              key={subIndex}
                              onClick={() => navigate(sub.link)}
                              className={clsx(
                                "text-gray-300 flex flex-row gap-2 mt-2 items-center text-md py-1 px-2 cursor-pointer rounded-md hover:bg-gray-700 transition-all duration-200",
                                isSubActive && "bg-gray-700 text-white"
                              )}
                            >
                              {sub.icon}
                              {sub.label}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="flex justify-end bg-gray-900">
        <button
          className="w-full h-15 cursor-pointer border-t border-gray-500 text-white flex flex-row items-center gap-2 justify-center transition-colors duration-300 hover:bg-gray-800"
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
