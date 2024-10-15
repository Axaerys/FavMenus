// ShopLayout.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ShopLayout = ({ children }) => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const storedShops = JSON.parse(localStorage.getItem("shops")) || [];
    const foundShop = storedShops.find((shop) => shop.name === shopId);
    if (foundShop) {
      setShop(foundShop);
    }
  }, [shopId]);

  if (!shop) return <div className="text-white">Loading...</div>;

  return (
    <section className="w-full">
      {/* Your layout content */}
      <div className=" h-full fixed top-0 left-0 w-full rounded-lg">
        {shop.image && (
          <img
            src={shop.image} // Use the base64 image string here
            className="opacity-15 object-cover w-full h-full blur-sm -z-10"
          />
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default ShopLayout;
