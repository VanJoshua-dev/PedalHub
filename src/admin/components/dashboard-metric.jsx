import React from "react";

function DashboardMetric() {
  const cards = [
    { name: "Total Sales", icon: "", value: 100, color: "#8962E1" },
    { name: "Total Orders", icon: "", value: 100, color: "#19D895" },
    { name: "Avg. Order Value", icon: "", value: "₱188", color: "#2196F3" },
    { name: "Returning Customers", icon: "", value: 28, color: "#FFAF00" },
  ];
  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 ">
      {/* cards */}
      {cards.map((card, index) => (
        <div
          className="bg-gray-300  rounded-md w-full h-40 p-5 text-xl"
          style={{ backgroundColor: card.color }}
          key={index} 
        >
          <div>
            <h1 className="font-medium text-md">{card.name}</h1>
          </div>
          <span className="text-4xl">{card.value}</span>
        </div>
      ))}
    </div>
  );
}

export default DashboardMetric;
