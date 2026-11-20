// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

// const FeelCarousel = ({ therapy }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       loop: true,
//       align: "center",
//       slidesToScroll: 1,
//     },
//     [
//       Autoplay({
//         delay: 3000,
//         stopOnInteraction: false,
//         stopOnMouseEnter: true,
//       }),
//     ],
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setActiveIndex(emblaApi.selectedScrollSnap());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     onSelect();
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);

//     return () => {
//       emblaApi.off("select", onSelect);
//       emblaApi.off("reInit", onSelect);
//     };
//   }, [emblaApi, onSelect]);

//   const cards = [
//     {
//       title: "How does your Mind respond to the ritual",
//       content: therapy.feel[0].mind,
//     },
//     {
//       title: "How does your body respond to the ritual",
//       content: therapy.feel[0].body,
//     },
//     {
//       title: "How does your soul respond to the ritual",
//       content: therapy.feel[0].soul,
//     },
//   ];

//   return (
//     <section className="relative min-h-[60vh] lg:min-h-[80vh] py-16 text-white overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 w-full h-full bg-black">
//         <img
//           src="/images/services/s1.jpg"
//           className="w-full h-full object-cover opacity-60"
//           alt=""
//         />
//       </div>

//       {/* Carousel */}
//       <div className="relative z-10 w-full h-full">
//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex h-full ">
//             {cards.map((card, index) => (
//               <div
//                 key={card.title}
//                 onClick={() => emblaApi?.scrollTo(index)}
//                 className="flex-[0_0_82%] md:flex-[0_0_70%] lg:flex-[0_0_70%] min-w-0 px-1.5 md:px-2 py-6 cursor-pointer h-full
//                 "
//               >
//                 <div
//                   className={`flex flex-col items-center justify-center h-full md:min-h-120 bg-[#776A57]/60 rounded-3xl lg:rounded-4xl p-8 sm:p-10 lg:p-14 xl:p-16 gap-8 lg:gap-12 transition-all duration-700 ease-out ${
//                     activeIndex === index
//                       ? "scale-100 opacity-100 bg-[#776A57]"
//                       : "scale-[0.88] opacity-50"
//                   }`}
//                 >
//                   <h3 className="font-bold text-center font-sinister text-xl uppercase max-w-xl">
//                     {card.title}
//                   </h3>

//                   <p className="text-justify max-w-lg">{card.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation dots */}
//         <div className="flex justify-center items-center gap-3 mt-8">
//           {cards.map((card, index) => (
//             <button
//               key={card.title}
//               onClick={() => emblaApi?.scrollTo(index)}
//               aria-label={`Go to slide ${index + 1}`}
//               aria-current={activeIndex === index ? "true" : undefined}
//               className={`rounded-full transition-all duration-500 ${
//                 activeIndex === index
//                   ? "w-8 h-2 bg-white"
//                   : "w-2 h-2 bg-white/40"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeelCarousel;

"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const FeelCarousel = ({ therapy }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const cards = [
    {
      title: "How does your Mind respond to the ritual",
      content: therapy.feel[0].mind,
    },
    {
      title: "How does your body respond to the ritual",
      content: therapy.feel[0].body,
    },
    {
      title: "How does your soul respond to the ritual",
      content: therapy.feel[0].soul,
    },
  ];

  return (
    <section className="relative min-h-[60vh] lg:min-h-[80vh] py-16 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <img
          src="/images/services/s1.jpg"
          className="w-full h-full object-cover opacity-60"
          alt=""
        />
      </div>

      {/* Carousel */}
      <div className="relative z-10 w-full h-full">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {cards.map((card, index) => (
              <div
                key={card.title}
                role="button"
                tabIndex={0}
                aria-label={`Show ${card.title}`}
                onClick={() => emblaApi?.scrollTo(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    emblaApi?.scrollTo(index);
                  }
                }}
                className="flex-[0_0_82%] md:flex-[0_0_70%] min-w-0 px-1.5 md:px-2 py-6 cursor-pointer h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <div
                  className={`flex flex-col items-center justify-center h-full min-h-120 bg-[#776A57]/60 rounded-3xl lg:rounded-4xl p-8 sm:p-10 lg:p-14 xl:p-16 gap-8 lg:gap-12 transition-all duration-700 ease-out ${
                    activeIndex === index
                      ? "scale-100 opacity-100 bg-[#776A57]"
                      : "scale-[0.88] opacity-50"
                  }`}
                >
                  <h3 className="font-bold text-center font-sinister text-xl uppercase max-w-xl">
                    {card.title}
                  </h3>
                  <p className="text-justify max-w-lg">{card.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {cards.map((card, index) => (
            <button
              key={card.title}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeelCarousel;
