// import React from "react";
// import { therapies } from "@/app/constants/data";

// const therapy = therapies[0];
// const therapyName = therapy.id.charAt(0).toUpperCase() + therapy.id.slice(1);

// const TherapyPage = () => {
//   return (
//     <section className="w-full h-full min-h-svh">
//       {/* first div with image */}
//       <div className="h-full min-h-[65vh] flex items-center justify-center lg:mx-40 mx-8 my-20">
//         <img
//           src="/images/services/s-main.png"
//           className="w-auto lg:h-[60vh] h-full object-cover "
//         />
//       </div>

//       {/* therapy name and description */}
//       <div className="h-full flex flex-col lg:flex-row max-lg:gap-8 items-center lg:items-start justify-between mx-40 py-20 relative">
//         <h1 className="text-4xl font-extralight font-sinister">
//           {therapyName}
//         </h1>
//         <p className="max-w-md text-center lg:absolute inset-0 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
//           {therapy.introduction}
//         </p>
//         <h1 className="text-4xl font-extralight font-sinister">
//           {therapyName} in hindi
//         </h1>
//       </div>

//       {/* what happens in this therapy */}
//       <div className="flex flex-col justify-center items-center my-20">
//         <h2 className="text-2xl font-sinister">
//           WHAT UNFOLDS WITHIN THIS THERAPY?
//         </h2>
//         <div className="flex justify-between mx-40 my-20 gap-10">
//           {therapy.procedure.map((step) => {
//             const separatorIndex = step.indexOf("-");

//             return (
//               <div key={step} className="flex flex-col items-center gap-8 ">
//                 <h3 className="font-bold font-sinister text-xl">
//                   {separatorIndex === -1
//                     ? "The ritual"
//                     : step.slice(0, separatorIndex).trim()}
//                 </h3>
//                 <p className="text-center">
//                   {separatorIndex === -1
//                     ? step
//                     : step.slice(separatorIndex + 1).trim()}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* body / mind / soul */}
//       <div className="flex justify-between items-center px-40 my-20 gap-4 min-h-[80vh] relative text-white">
//         <div className="absolute inset-0 w-full h-full bg-black -z-10">
//           <img
//             src="/images/services/s1.jpg"
//             className="w-full h-full object-cover opacity-60"
//           />
//         </div>

//         <div className="flex flex-col items-center bg-[#776A57]/60 rounded-4xl p-20 gap-16 hover:scale-125 transition-all duration-500 ease-out hover:bg-[#776a57]">
//           <h3 className="font-bold text-justify px-2 font-sinister text-xl uppercase">
//             How does your Mind respond to the ritual
//           </h3>
//           <p className="text-justify">{therapy.feel[0].mind}</p>
//         </div>
//         <div className="flex flex-col items-center bg-[#776A57]/60 rounded-4xl p-20 gap-16 hover:scale-125 transition-all duration-500 ease-out hover:bg-[#776a57]">
//           <h3 className="font-bold text-justify px-2 font-sinister text-xl uppercase">
//             How does your body respond to the ritual
//           </h3>
//           <p className="text-justify">{therapy.feel[0].body}</p>
//         </div>
//         <div className="flex flex-col items-center bg-[#776A57]/60 rounded-4xl p-20 gap-16 hover:scale-125 transition-all duration-500 ease-out hover:bg-[#776a57]">
//           <h3 className="font-bold text-justify px-2 font-sinister text-xl uppercase">
//             How does your soul respond to the ritual
//           </h3>
//           <p className="text-justify">{therapy.feel[0].soul}</p>
//         </div>
//       </div>

//       {/* Before / After */}
//       <div className="flex justify-between mx-40 my-20 relative gap-40 px-20">
//         <div className="flex flex-col items-center gap-8">
//           <h3 className="font-bold text-2xl font-sinister">BEFORE</h3>
//           <ul className="">
//             {therapy.before.map((item) => (
//               <li key={item} className="text-center py-2">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="absolute h-full w-px bg-black left-1/2 -translate-x-1/2" />
//         <div className="flex flex-col items-center gap-8">
//           <h3 className="font-bold text-2xl font-sinister">AFTER</h3>
//           <ul>
//             {/* className="list-disc" */}
//             {therapy.after.map((item) => (
//               <li key={item} className="text-center py-2">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* What is it for */}
//       <div className="flex flex-col gap-4 mx-40 my-20 justify-center items-center">
//         <h3 className="py-4 font-bold font-sinister text-2xl font-light">
//           Who is it for?
//         </h3>
//         {therapy.whatFor.map((item) => (
//           <p key={item}>{item}</p>
//         ))}
//       </div>

//       {/* CTA section */}
//       <div className="bg-[#776A57] py-40">
//         <div className="flex flex-col mx-40 justify-center items-center gap-10 uppercase text-white">
//           <h2 className="text-4xl">Take a moment to slow down</h2>
//           <p>Begin your journey</p>
//           <button className="text-xl border rounded-full px-4 py-1.5">
//             Book your consultation
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TherapyPage;

import React from "react";
import { therapies } from "@/app/constants/data";
import FeelCarousel from "@/components/ui/FeelCarousel";

const therapy = therapies[0];
const therapyName = therapy.id.charAt(0).toUpperCase() + therapy.id.slice(1);

const TherapyPage = () => {
  return (
    <section className="w-full min-h-svh">
      {/* First div with image */}
      <div className="w-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] flex items-center justify-center mx-auto px-6 sm:px-10 lg:px-20  my-12 sm:my-16 lg:my-20">
        <img
          src="/images/services/s-main.png"
          className="w-full sm:w-auto h-auto max-h-[50vh] sm:max-h-[60vh] lg:h-[60vh] object-contain"
        />
      </div>

      {/* Therapy name and description */}
      <div className="flex flex-col xl:flex-row xl:gap-8 items-center xl:items-start justify-between w-full  mx-auto px-6 sm:px-10 xl:px-32 py-12 xl:py-20 relative">
        <h1 className="text-3xl sm:text-4xl font-extralight font-sinister text-center lg:text-left">
          {therapyName}
        </h1>

        <p className="w-full max-w-md text-justify my-6 xl:my-0 xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
          {therapy.introduction}
        </p>

        <h1 className="text-3xl sm:text-4xl font-extralight font-sinister text-center xl:text-right">
          {therapyName} in hindi
        </h1>
      </div>

      {/* What happens in this therapy */}
      <div className="flex flex-col justify-center items-center my-16 sm:my-20 px-6 sm:px-10 lg:px-16">
        <h2 className="text-xl sm:text-3xl font-sinister text-center">
          WHAT UNFOLDS WITHIN THIS THERAPY?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between sm:last:justify-self-center w-full max-w-7xl mx-auto my-12 lg:my-20 gap-12 lg:gap-10 ">
          {therapy.procedure.map((step) => {
            const separatorIndex = step.indexOf("-");

            return (
              <div
                key={step}
                className="flex flex-col items-center gap-6 lg:gap-8"
              >
                <h3 className="font-bold font-sinister text-xl text-center">
                  {separatorIndex === -1
                    ? "The ritual"
                    : step.slice(0, separatorIndex).trim()}
                </h3>

                <p className="text-center max-w-md">
                  {separatorIndex === -1
                    ? step
                    : step.slice(separatorIndex + 1).trim()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Body / Mind / Soul */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-stretch px-6 sm:px-10 lg:px-16 xl:px-40 py-16 lg:py-20 gap-6 lg:gap-4 min-h-[60vh] lg:min-h-[80vh] relative text-white">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <img
            src="/images/services/s1.jpg"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="flex flex-col items-center justify-center bg-[#776A57]/60 rounded-3xl lg:rounded-4xl p-8 sm:p-10 gap-8 lg:gap-16 transition-all duration-500 ease-out hover:bg-[#776a57] lg:hover:scale-110">
          <h3 className="font-bold text-justify px-2 font-sinister text-xl uppercase">
            How does your Mind respond to the ritual
          </h3>

          <p className="text-justify">{therapy.feel[0].mind}</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#776A57]/60 rounded-3xl lg:rounded-4xl p-8 sm:p-10 lg:p-12 xl:p-20 gap-8 lg:gap-16 transition-all duration-500 ease-out hover:bg-[#776a57] lg:hover:scale-110">
          <h3 className="font-bold text-justify px-2 font-sinister text-xl uppercase">
            How does your body respond to the ritual
          </h3>

          <p className="text-justify">{therapy.feel[0].body}</p>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#776A57]/60 rounded-3xl lg:rounded-4xl p-8 sm:p-10 lg:p-12 xl:p-20 gap-8 lg:gap-16 transition-all duration-500 ease-out hover:bg-[#776a57] lg:hover:scale-110 md:col-span-2 lg:col-span-1">
          <h3 className="font-bold text-justify px-2 font-sinister text-xl uppercase">
            How does your soul respond to the ritual
          </h3>

          <p className="text-justify">{therapy.feel[0].soul}</p>
        </div>
      </div> */}

      <FeelCarousel therapy={therapy} />

      {/* Before / After */}
      <div className="flex flex-col sm:flex-row justify-between mx-auto w-full max-w-7xl my-16 lg:my-20 relative gap-12 sm:gap-10 lg:gap-20 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col items-center gap-6 sm:w-1/2">
          <h3 className="font-bold text-2xl font-sinister uppercase text-center">
            BEFORE the therapy
          </h3>

          <ul className="w-full">
            {therapy.before.map((item) => (
              <li key={item} className="text-center py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden sm:block absolute h-full w-px bg-black left-1/2 -translate-x-1/2" />

        <div className="flex flex-col items-center gap-6 sm:w-1/2">
          <h3 className="font-bold text-2xl font-sinister uppercase text-center">
            AFTER the therapy
          </h3>

          <ul className="w-full">
            {therapy.after.map((item) => (
              <li key={item} className="text-center py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What is it for */}
      <div className="flex flex-col gap-4 mx-auto w-full max-w-5xl my-16 lg:my-20 justify-center items-center px-6 sm:px-10 lg:px-16">
        <h3 className="py-4 font-bold font-sinister text-xl sm:text-3xl text-center">
          Who is it for?
        </h3>

        {therapy.whatFor.map((item) => (
          <p key={item} className="text-center">
            {item}
          </p>
        ))}
      </div>

      {/* CTA section */}
      <div className="bg-[#776A57] py-24 sm:py-32 lg:py-40 px-6 sm:px-10">
        <div className="flex flex-col mx-auto max-w-5xl justify-center items-center gap-8 lg:gap-10 uppercase text-white text-center">
          <h2 className="text-3xl sm:text-4xl font-sinister">
            Take a moment to slow down
          </h2>

          <p>Begin your journey</p>

          <button className="text-lg sm:text-xl border rounded-full px-4 py-1.5">
            Book your consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default TherapyPage;
