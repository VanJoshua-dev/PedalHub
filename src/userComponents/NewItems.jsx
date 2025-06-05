import React, { useRef, useState, useEffect } from "react";
import Img from "../assets/categorySample.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import products from "../data/products.json";

import { getNewItems } from "../utils/fetcher";
export default function NewItems() {
    //Get new Items
    const newItems = getNewItems(products);

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
        <div className="w-full flex flex-row justify-center">
        <div className="shadow w-300 p-2">
            <div className="border-b-2 flex flex-row justify-between items-center border-gray-300 py-5 text-xl">
            <h1>🔵 New Items</h1>
            <a
                href=""
                className="flex flex-row justify-center text-[17px] items-center gap-1 hover:underline"
            >
                See All <IoIosArrowForward />{" "}
            </a>
            </div>

            <div className="relative">
            {/* Left Scroll Button */}
            {canScrollLeft && (
                <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                <IoIosArrowBack />
                </button>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto overflow-x-hidden scroll-smooth px-1 py-1"
                onScroll={updateScrollButtons}
            >
                {newItems.map((newItem, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center w-48 h-48 shadow p-2 rounded-sm hover:bg-gray-100"
                >
                    <img
                    src={newItem.image}
                    alt=""
                    className="w-30 h-30 object-cover"
                    />
                    <p className="text-center break-all  text-sm mt-2">
                    {newItem.name}
                    </p>
                </div>
                ))}
            </div>

            {/* Right Scroll Button */}
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
