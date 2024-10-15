import Delete from "./Delete";
import Edit from "./Edit";

const Shop = ({ name, color, desc, image, count }) => {
  return (
    <section className="bg-black flex-start w-80">
      <div className="relative h-28 w-full rounded-lg overflow-hidden">
        {image && (
          <img
            src={image} // Use the base64 image string here
            alt={`${name} Logo`}
            className="opacity-25 object-cover w-full h-full"
          />
        )}
      </div>
      <div className="px-4 flex flex-col absolute p-3" style={{ color: color }}>
        <div className="text-2xl font-bold font-baumans tracking-widest text-shadow-white">
          {name}
        </div>
        <div className="font-palanquin text-white text-shadow-white mb-2">
          {desc}
        </div>
        <div className="font-palanquin text-white text-shadow-white">
          Favourite Menus:&nbsp;&nbsp;&nbsp;
          <span
            className="text-xl text-shadow-white font-bold"
            style={{ color: color }}
          >
            {count}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Shop;
