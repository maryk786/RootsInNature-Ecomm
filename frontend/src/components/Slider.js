// Carousel.js
import React, { useState, useEffect } from "react";
import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import { Link } from "react-router-dom";
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  let [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((activeIndex + 1) % 2);
    }, 4000);
    setIntervalId(intervalId);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const images = [
    {
      url: img1,
      alt: "First Image",
      dataColor: "lightblue",
    },
    {
      url: img2,
      alt: "Second Image",
      dataColor: "firebrick",
    },
  ];

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      {/* Wrapper for slides */}
      <div className="carousel-inner">
        <Link className="w-full" to={"/"}>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              active={index === activeIndex}
              image={image}
            />
          ))}
        </Link>
      </div>
    </div>
  );
};

const CarouselItem = ({ active, image }) => (
  <div className={`carousel-item ${active ? "active" : ""}`}>
    <img
      className="d-block w-full h-[30rem] rounded cursor-pointer"
      src={image.url}
      data-color={image.dataColor}
      alt={image.alt}
    />
  </div>
);

export default Carousel;
