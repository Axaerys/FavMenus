"use client";

import { useEffect, useState } from "react";

const Scroll = ({ display, scroll }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOpacity(0); // Hide when scrolling down
      } else {
        setOpacity(1); // Show when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`scrolldown ${display} ${scroll}`}
      style={{ opacity, transition: "opacity 0.5s ease" }}
    >
      <div className="chevrons">
        <div className="chevrondown"></div>
        <div className="chevrondown"></div>
      </div>
    </div>
  );
};
export default Scroll;
