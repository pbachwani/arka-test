import React from "react";
import GradientBlocks from "./ui/GradientBlocks";

const KYP = () => {
  return (
    <section
      id="kyp"
      className="h-screen w-full flex flex-col bg-background py-10 px-6"
    >
      <div className="w-full flex justify-between items-center">
        <h2 className="font-sinister text-5xl">Know Your Prakarti</h2>
        <button>KPY page</button>
      </div>
      <div className="w-full h-px bg-black" />
      <div className="w-full flex items-center justify-center py-16">
        <GradientBlocks />
      </div>
    </section>
  );
};

export default KYP;
