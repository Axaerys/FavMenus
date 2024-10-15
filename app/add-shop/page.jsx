import Form from "@components/Form";
import Image from "next/image";
import bgImage from "@assets/bg.jpg"; // Adjust import for correct syntax
import Hero from "@components/Hero";

const CreatePage = () => {
  return (
    <>
      <div className="fixed w-screen h-full top-0 left-0 -z-10">
        <Image
          src={bgImage}
          alt="Background Image"
          layout="fill" // Ensures the image covers the entire div
          objectFit="cover" // Ensures the image scales correctly
          className="opacity-15 blur-sm" // Adjust the opacity
        />
      </div>
      <div className="flex-center w-full min-h-screen flex-col lg:flex-row lg:gap-64">
        <div className="lg:w-[30rem]">
          <Hero display={"lg:hidden"} />
        </div>
        <Form op="Add" />
      </div>
    </>
  );
};

export default CreatePage;
