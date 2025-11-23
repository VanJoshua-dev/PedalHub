import React from "react";
// import { FaDollarSign, MdToday, FaShoppingCart, MdPending, FaUsers } from 'react-icons/all';
import { FaDollarSign } from "react-icons/fa";
import { MdToday } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

function DashboardMetric(metrics_data) {
  let iconSize = 40;

  const data = [

    metrics_data?.data?.total_revenue?.[0]?.total_revenue ?? "0.00",

    metrics_data?.data?.todays_sales?.[0]?.todays_sales ?? "0.00",

    metrics_data?.data?.total_orders?.[0]?.total_orders ?? 0,

    metrics_data?.data?.pending_orders?.[0]?.pending_orders ?? 0,

    metrics_data?.data?.total_users?.[0]?.total_users ?? 0,

  ];

  const cards = [
    {
      name: "Total Sales",
      icon: <FaDollarSign size={iconSize} />,
      value: "₱" + data[0],
      color: "#8962E1",
    },
    {
      name: "Today's Sales",
      icon: <MdToday size={iconSize} />,
      value: "₱" + data[1],
      color: "#19D895",
    },
    {
      name: "Total Orders",
      icon: <FaShoppingCart size={iconSize} />,
      value: data[2],
      color: "#2196F3",
    },
    {
      name: "Pending Orders",
      icon: <MdPending size={iconSize} />,
      value: data[3],
      color: "#FF5722",
    },
    {
      name: "Total Users",
      icon: <FaUsers size={iconSize} />,
      value: data[4],
      color: "#FFC107",
    },
  ];
  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 ">
      {/* cards */}
      {cards.map((card, index) => (
        <div
          className="bg-white rounded-sm w-full h-40 p-5 text-xl relative" // Added 'relative' for absolute positioning of the icon
          style={{
            borderWidth: "2px 2px 2px 2px",
            borderStyle: "solid",
            borderColor: card.color,
          }}
          key={index}
        >
          <div className="">
            <div>
              <h1 className="font-medium text-md">{card.name}</h1>
            </div>
            <span className="text-4xl">{card.value}</span>
          </div>
          <div className="absolute bottom-2 right-2">
            {" "}
            {/* Positioned at bottom-right with some padding */}
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardMetric;
