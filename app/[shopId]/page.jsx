"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import Menu from "@components/Menu";
import Add from "@components/Add";
import Hero from "@components/Hero";

const Menus = () => {
  const { shopId } = useParams(); // Get the shopId from the URL parameters
  const [shops, setShops] = useState(null); // State to hold shop data

  useEffect(() => {
    // Load shops from local storage
    const storedShops = JSON.parse(localStorage.getItem("shops")) || [];
    // Find the shop with the matching name
    const foundShop = storedShops.find((shop) => shop.name === shopId);

    if (foundShop) {
      setShops(foundShop); // Set the found shop data to state
    }
  }, [shopId]); // Effect runs when shopId changes

  const handleDelete = (menuIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu item?"
    ); // Ask for confirmation
    if (!confirmed) return; // Exit if the user cancels

    // Make a copy of the existing shops
    const updatedShops = JSON.parse(localStorage.getItem("shops")) || [];

    // Find the index of the shop we are working with
    const shopIndex = updatedShops.findIndex((shop) => shop.name === shopId);

    if (shopIndex === -1) return; // Shop not found

    // Remove the menu item at the specified index
    updatedShops[shopIndex].menus.splice(menuIndex, 1);

    // Update local storage with the updated shops
    localStorage.setItem("shops", JSON.stringify(updatedShops));

    // Update the component state to reflect changes
    setShops(updatedShops[shopIndex]); // This might need adjustment if you're not resetting the menus correctly.
  };

  if (!shops) return <div className="text-white">Shop not found!</div>; // Show a message if shop not found

  return (
    <section>
      <Hero />
      {/* Display shop name */}

      {/* Render menu items */}
      <div className="flex justify-center items-start flex-col w-full">
        <div
          style={{ color: shops.color }}
          className="text-3xl font-baumans tracking-widest font-extrabold "
        >
          {shops.name}
        </div>
        <div className="flex flex-wrap justify-center items-start mb-10 mt-5 w-full">
          {shops.menus.length > 0 ? (
            shops.menus.map((menu, index) => (
              <div className="my-2 md:mx-2" key={index}>
                <Menu
                  title={menu.title}
                  order={menu.order}
                  price={menu.price}
                  color={shops.color}
                  menuIndex={index} // Pass the correct menuIndex
                  name={shops.name}
                  onDelete={handleDelete} // Pass the delete handler directly
                />
              </div>
            ))
          ) : (
            <div className="text-white text-center">
              No menus available for this shop! <br /> Add one using the +
              button on the bottom right of your screen.
            </div>
          )}
        </div>

        <div className="fixed bottom-8 right-8">
          <Add href={`/${shops.name}/add-menu`} tooltip="Add Menu" />
        </div>
      </div>
    </section>
  );
};

export default Menus;
