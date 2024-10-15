import logo from "../assets/logo.png";
import Image from "next/image";
import Scroll from "@components/Scroll";

const Hero = ({ display }) => {
  return (
    <div className="relative w-full h-screen flex-center flex-col">
      <div className="w-full flex-center">
        <Image
          src={logo}
          alt="Background Image"
          layout="contain" // Ensures the image covers the entire div
          objectFit="contain" // Ensures the image scales correctly
          className="w-40 lg:w-56" // Adjust the opacity
        />
      </div>
      <h1 className="pt-2 flex justify-start items-center flex-col font-montserrat font-semibold text-white text-center text-2xl lg:text-[36px] leading-normal">
        Save your favourite menus from different <br />
        <span className="font-extrabold gradient-text">
          Restaurants and Cafes!
        </span>
      </h1>
      <Scroll display={display} />
    </div>
  );
};

export default Hero;
