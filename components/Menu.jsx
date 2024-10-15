import React from "react";
import Edit from "./Edit";
import Delete from "./Delete";

const Menu = ({
  title,
  color,
  order,
  price,
  menuIndex,
  name,
  onDelete, // Use onDelete as a prop
}) => {
  return (
    <section className="mt-4 pb-4 px-4 bg-light-gray font-playwrite flex-start flex-col w-80 rounded-lg overflow-hidden shadow-3xl hover:shadow-3xlhover hover:scale-105 td">
      <h1
        style={{ color: color }}
        className="text-white text-lg font-semibold relative bg-light-gray top-3 left-3 rounded-full px-2"
      >
        {title}
      </h1>
      <div className="border-[1px] w-full p-4 py-8 rounded-md text-white break-words">
        <p>{order}</p>
        <br />
        <p>
          Price : <span style={{ color: color }}>{price}</span>
        </p>

        <div className="relative bottom-5 left-52 -mb-10 flex gap-2">
          <Edit color={color} href={`/${name}/edit-menu/${menuIndex}`} />
          <Delete
            color={color}
            onClick={() => onDelete(menuIndex)} // Correctly pass the menuIndex to onDelete
          />
        </div>
      </div>
    </section>
  );
};

export default Menu;
