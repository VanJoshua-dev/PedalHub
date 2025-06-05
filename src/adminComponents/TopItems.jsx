import React from "react";
import sample from "../assets/categorySample.png";
function TopItems() {
  const TopItem = [
    {
      image: sample,
      name: "sample1",
      desc: "This is sample description",
      sold: 2600,
    },
    {
      image: sample,
      name: "sample1",
      desc: "This is sample description",
      sold: 2600,
    },
    {
      image: sample,
      name: "sample1",
      desc: "This is sample description",
      sold: 2600,
    },
    {
      image: sample,
      name: "sample1",
      desc: "This is sample description",
      sold: 2600,
    },
  ];
  return (
    <div className="w-full flex items-center justify-center gap-2 mt-8">
      <div className="w-full bg-white">
        <h1 className="p-2 border-b-2 border-gray-300">🔥 Top Items</h1>
        <div className="h-80 overflow-auto flex flex-col gap-1 p-1">
          {TopItem.map((item, index) => (
            <div key={index} className="bg-gray-100 flex gap-2 h-25 p-2 relative">
              <img src={item.image} alt="" className="w-20" />
              <div>
                {/* Description */}
                <p className="text-lg">{item.name}</p>
                <p className="text-[12px]">description:</p>
                <p className="text-[14px] pl-2">{item.desc}</p>
              </div>
              <p className="absolute right-5 bottom-2 text-gray-400">
                {item.sold} Solds
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopItems;
