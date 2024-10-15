"use client";

import Shop from "@components/Shop";
import { useState, useEffect } from "react";
import Link from "next/link";
import Add from "@components/Add";
import Edit from "@components/Edit";
import Delete from "@components/Delete";
import Image from "next/image";
import bgImage from "@assets/bg.jpg"; // Adjust import for correct syntax
import Hero from "@components/Hero";

const Home = () => {
  const [shops, setShops] = useState([]);

  // Load shops from local storage when the component mounts
  useEffect(() => {
    const storedShops = JSON.parse(localStorage.getItem("shops")) || [];
    console.log("Loading shops:", storedShops);
    console.log("Component Mounted");
    setShops(storedShops);
    return () => {
      console.log("Component Unmounted");
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleDelete = (shopIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shop?"
    ); // Ask for confirmation
    if (confirmed) {
      const updatedShops = shops.filter((_, index) => index !== shopIndex);
      setShops(updatedShops);
      localStorage.setItem("shops", JSON.stringify(updatedShops)); // Update local storage
    }
  };

  return (
    <section>
      <div className="fixed w-screen h-full top-0 left-0 -z-10">
        <Image
          src={bgImage}
          alt="Background Image"
          layout="fill" // Ensures the image covers the entire div
          objectFit="cover" // Ensures the image scales correctly
          className="opacity-15 blur-sm" // Adjust the opacity
        />
      </div>

      <Hero />
      <h1 className="text-3xl font-baumans tracking-widest font-extrabold text-white lg:mx-20">
        Your Diners
      </h1>
      <div className="flex-center flex-col md:flex-row mb-10 mt-5 flex-wrap ">
        {shops.length > 0 ? (
          shops.map((shop, index) => (
            <div
              key={index}
              className="my-2 md:mx-2 border-[1px] rounded-lg overflow-hidden shadow-3xl hover:shadow-3xlhover hover:scale-105 td"
              style={{ borderColor: shop.color }}
            >
              <Link href={`/${shop.name}`}>
                <Shop
                  name={shop.name}
                  desc={shop.desc}
                  color={shop.color}
                  image={shop.image}
                  count={shop.menus.length}
                />
              </Link>
              <div className="relative bottom-9 left-64 -mb-5 flex gap-2">
                <Edit color={shop.color} href={`/${shop.name}/edit-shop`} />
                <Delete
                  color={shop.color}
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center">
            No shops available! <br /> Add one using the + button on the bottom
            right of your screen.
          </div>
        )}
        <div className="fixed bottom-8 right-8">
          <Add href="/add-shop" tooltip="Add Shop" />
        </div>
      </div>
    </section>
  );
};

export default Home;
