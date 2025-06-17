import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import products from "../data/products.json";
import { getTopItems } from "../utils/fetcher";

function TopItems({ onItemClick }) {
  const topItems = getTopItems(products);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="shadow w-300 p-2">
        <div className="border-b-2 flex justify-between items-center border-gray-300 py-5 text-xl">
          <h1>🔥 Top Items</h1>
          {topItems > 10 &&(
              <a
                href="#"
                className="flex items-center gap-1 text-[17px] hover:underline"
              >
                See All <IoIosArrowForward />
              </a>
            )}
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <IoIosArrowBack />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scroll-smooth px-1 py-1"
            onScroll={updateScrollButtons}
          >
            {topItems.map((topItem, index) => (
              <div
                key={index}
                onClick={() => onItemClick(topItem)}
                title="Tap to view item"
                className="cursor-pointer flex-shrink-0 flex flex-col items-center w-48 h-48 shadow p-2 rounded-sm hover:bg-gray-100"
              >
                <img
                  src={topItem.image}
                  alt={topItem.name}
                  className="w-30 h-30 object-cover"
                />
                <p className="text-center break-all text-sm mt-2">
                  {topItem.name}
                </p>
                <p className="text-start px-7 w-full break-all text-md mt-1">
                  ₱{topItem.price}
                </p>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopItems;
