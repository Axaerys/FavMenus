"use client";

import { useRouter, useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const MenuForm = ({ op }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const router = useRouter();
  const { shopId, menuId } = useParams(); // Get shopId and menuId from URL

  // Load shops from local storage
  const loadShops = () => {
    return JSON.parse(localStorage.getItem("shops")) || [];
  };

  useEffect(() => {
    if (op === "Edit") {
      // Pre-fill the form if we're editing an existing menu
      const existingShops = loadShops();
      const shop = existingShops.find((shop) => shop.name === shopId);
      if (shop && shop.menus[menuId]) {
        const menu = shop.menus[menuId];
        nameRef.current.value = menu.title;
        textareaRef.current.value = menu.order;
        priceRef.current.value = menu.price;
        setText(menu.order); // Ensure textarea height adjusts
      }
    }
  }, [shopId, menuId, op]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const textarea = textareaRef.current.value;
    const price = priceRef.current.value;

    const newMenu = {
      title: name,
      order: textarea,
      price: price,
    };

    // Load existing shops from local storage
    const existingShops = loadShops();

    // Find the shop by shopId (name) and update its menus
    const updatedShops = existingShops.map((shop) => {
      if (shop.name === shopId) {
        if (op === "Add") {
          // Add a new menu item
          return {
            ...shop,
            menus: [...shop.menus, newMenu],
          };
        } else if (op === "Edit") {
          // Update the specific menu by index
          const updatedMenus = [...shop.menus];
          updatedMenus[menuId] = newMenu;
          return {
            ...shop,
            menus: updatedMenus,
          };
        }
      }
      return shop; // Return the shop unchanged if it's not the one we're updating
    });

    // Save updated shops to local storage
    localStorage.setItem("shops", JSON.stringify(updatedShops));

    // Clear inputs
    nameRef.current.value = "";
    textareaRef.current.value = "";
    priceRef.current.value = "";

    router.back(); // Go back to the previous page
  };

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    // Adjust the textarea height when text changes
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 mb-10 p-4 bg-light-gray rounded-lg min-w-80 border-[1px] border-[cyan]"
    >
      <h1 className="text-white text-lg text-center font-semibold">
        {op} Menu
      </h1>
      <div className="mb-4">
        <div className="text-white font-satoshi">Name:</div>
        <input
          type="text"
          className="input font-satoshi"
          ref={nameRef}
          placeholder="e.g. The Best Meal"
        />
      </div>

      <div className="mb-4">
        <div className="text-white font-satoshi">The Order:</div>
        <textarea
          className="input font-satoshi min-h-20 py-1"
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          rows="1"
          style={{
            overflow: "clip",
            resize: "none", // Disable manual resize
          }}
          placeholder="e.g. Medium Big Tasty Meal, Pepsi, Big Tasty Sauce on the side"
        />
      </div>

      <div className="mb-4 flex gap-4 justify-start items-center">
        <div className="text-white font-satoshi">Price:</div>
        <input
          type="number"
          className="input font-satoshi !w-24 !text-right !pr-3 !pl-1"
          ref={priceRef}
          placeholder="e.g. 37"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-md font-bold font-inter cursor-pointer text-[cyan] border-[1px] border-[cyan] px-4 py-1"
      >
        {op}
      </button>
      <button
        type="button"
        className="mt-2 ml-2 rounded-md font-bold font-inter cursor-pointer bg-transparent text-white px-4 py-1 hover:scale-95 td"
        onClick={handleGoBack}
      >
        Cancel
      </button>
    </form>
  );
};

export default MenuForm;
