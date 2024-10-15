import Hero from "@components/Hero";
import MenuForm from "@components/MenuForm";

const EditMenu = () => {
  return (
    <section className="flex-center">
      <div className="flex-center w-full min-h-screen flex-col lg:flex-row lg:gap-64">
        <div className="lg:w-[30rem]">
          <Hero display={"lg:hidden"} />
        </div>
        <MenuForm op="Edit" />
      </div>
    </section>
  );
};

export default EditMenu;
