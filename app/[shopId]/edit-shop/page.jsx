import Form from "@components/Form";
import Hero from "@components/Hero";

const EditPage = () => {
  return (
    <section className="flex-center">
      <div className="flex-center w-full min-h-screen flex-col lg:flex-row lg:gap-64">
        <div className="lg:w-[30rem]">
          <Hero display={"lg:hidden"} />
        </div>
        <Form op="Edit" />
      </div>
    </section>
  );
};

export default EditPage;
