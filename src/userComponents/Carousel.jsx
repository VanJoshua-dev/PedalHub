import React, { useState } from 'react'
import bg from '../assets/landingPagebackground.png'

 // Replace with your images

function Carousel() {
  const images = [bg, bg, bg, bg, bg]
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-300 max-w-7xl mx-auto overflow-hidden rounded-sm mt-2 shadow-lg">
      {/* Image container with custom height */}
      <div className="relative h-72 md:h-[450px]">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-sm transition duration-500"
        />
      </div>

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full cursor-pointer hover:bg-gray-300"
      >
        ❮
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-3 cursor-pointer rounded-full hover:bg-gray-300"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform-translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
