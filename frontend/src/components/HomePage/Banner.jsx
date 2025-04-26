import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bannerImage1 from "../../assets/group1.png";
import bannerImage2 from "../../assets/group2.png";
import bannerImage3 from "../../assets/group3.png"; // New 3rd banner

const images = [bannerImage1, bannerImage2]; // ✅ Left banner images

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto-slide functionality (left banner)
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // ✅ Go to next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // ✅ Go to previous slide
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-[98%] mx-auto flex space-x-4 mt-5">
      {/* Left Banner with Auto-slide */}
      <div className="w-[70%] h-[500px] relative overflow-hidden rounded-[30px] shadow-lg">
        {/* Current Slide */}
        <div
          className="w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        ></div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots for slide indication */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Banner (Static or Optional Auto-slide) */}
      <div className="w-[35%] h-[500px] relative overflow-hidden rounded-[30px] shadow-lg bg-cover bg-center">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage3})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
