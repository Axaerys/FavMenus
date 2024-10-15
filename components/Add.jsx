"use client";

import { useEffect, useState } from "react";

const Add = ({ href, tooltip }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOpacity(1); // Hide when scrolling down
      } else {
        setOpacity(0); // Show when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="relative group inline-block"
      style={{ opacity, transition: "opacity 0.5s ease-in" }}
    >
      <a
        href={href}
        className="rounded-full cursor-pointer border-[3px] border-white hover:scale-95 td w-14 h-14 flex-center leading-none"
      >
        <span className="font-montserrat font-light !text-[64px] text-white">
          +
        </span>
      </a>
      <span className="absolute opacity-0 bg-light-gray text-white text-xs rounded-lg px-2 py-1 transition-opacity duration-300 -top-12 text-center left-1/2 transform -translate-x-1/2 pointer-events-none group-hover:opacity-100">
        {tooltip}
      </span>
    </div>
  );
};

export default Add;
