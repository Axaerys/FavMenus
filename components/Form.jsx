"use client";

import { useRouter, useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const MyForm = ({ op }) => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const colorRef = useRef(null);
  const imageRef = useRef(null);
  const [fileName, setFileName] = useState("Select");
  const router = useRouter();
  const { shopId } = useParams(); // Get shopId from the URL
  const [shopData, setShopData] = useState(null);

  // Load shops from local storage when the component mounts
  const loadShops = () => {
    return JSON.parse(localStorage.getItem("shops")) || [];
  };

  // Load the shop data based on the shopId from the URL
  useEffect(() => {
    if (op === "Edit" && shopId) {
      const existingShops = loadShops();
      const shop = existingShops.find((s) => s.name === shopId);
      if (shop) {
        setShopData(shop);
        // Pre-fill the form fields
        nameRef.current.value = shop.name;
        descRef.current.value = shop.desc;
        colorRef.current.value = shop.color;
        setFileName(shop.image ? "Image selected" : "Select");
      }
    }
  }, [op, shopId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const desc = descRef.current.value;
    const color = colorRef.current.value;
    const imageFile = imageRef.current.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      const updatedShop = {
        name,
        desc,
        color,
        image: base64String || (shopData ? shopData.image : ""), // Use existing image if no new one is selected
        menus: shopData ? shopData.menus : [], // Preserve existing menus if in edit mode
      };

      // Load existing shops from local storage
      const existingShops = loadShops();

      let updatedShops;
      if (op === "Edit") {
        // Update the correct shop (handle name change)
        updatedShops = existingShops.map((s) =>
          s.name === shopId ? updatedShop : s
        );
        // If the name is changed, we need to ensure no shop with the same new name already exists
        if (existingShops.some((s) => s.name === name && s.name !== shopId)) {
          alert("A shop with this name already exists!");
          return;
        }
      } else {
        // Add new shop
        updatedShops = [...existingShops, updatedShop];
      }

      // Update local storage
      localStorage.setItem("shops", JSON.stringify(updatedShops));

      // Clear inputs
      nameRef.current.value = "";
      descRef.current.value = "";
      colorRef.current.value = "";
      imageRef.current.value = "";
      setFileName("Select");

      router.back(); // Go back to the previous page
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      reader.onloadend(); // Trigger the logic to update the shop if no image is uploaded
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 MB");
      imageRef.current.value = "";
      setFileName("Select");
    } else if (file) {
      setFileName(file.name);
    }
  };

  const handleFileClick = () => {
    imageRef.current.click();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 mb-10 p-4 bg-light-gray rounded-lg border-[1px] border-[cyan]"
    >
      <h1 className="text-white text-lg text-center font-semibold">
        {op} Shop
      </h1>
      <div className="mb-4">
        <div className="text-white font-satoshi">Name:</div>
        <input
          type="text"
          className="input font-satoshi"
          ref={nameRef}
          placeholder="e.g. McDonalds"
        />
      </div>

      <div className="mb-4">
        <div className="text-white font-satoshi">Short Description:</div>
        <input
          type="text"
          className="input font-satoshi"
          ref={descRef}
          placeholder="e.g. My fav diner"
        />
      </div>

      <div className="mb-4">
        <div className="text-white font-satoshi">Pick a Color:</div>
        <div className="flex flex-row gap-4">
          <input
            type="color"
            className="bg-transparent !w-8 !h-8 font-satoshi cursor-pointer"
            ref={colorRef}
          />
          <div className="text-sm text-gray-400 flex-center">
            e.g. Green for Starbucks
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-white font-satoshi">Choose Image:</div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="mt-2 text-sm bg-transparent hover:scale-95 td border-[1px] border-white text-white rounded-md px-4 py-1 font-satoshi"
          onClick={handleFileClick}
        >
          {fileName}
        </button>
        <div className="text-xs text-gray-400 flex-start mt-2">
          Choose an image that represents the Restaurant/Cafe.
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 rounded-md font-bold font-inter cursor-pointer text-[cyan] border-[1px] border-[cyan] px-4 py-1 hover:scale-95 td"
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

export default MyForm;
