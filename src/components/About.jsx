import React from "react";
import GradientBlocks from "./ui/GradientBlocks";
import ImageMarqueeScroll from "./ui/ImageMarqueeScroll";

const About = () => {
  return (
    <section
      id="about-section"
      className=" w-full flex flex-col bg-background py-10 px-6 relative"
    >
      {/* text content */}
      <div className="border-2 w-full h-full p-1 ">
        <div className="w-full h-full min-h-svh flex flex-col items-center justify-start py-10 z-10 border-4">
          <ImageMarqueeScroll
            baseVelocity={2}
            height={320}
            images={[
              "/images/about/1.png",
              "/images/about/2.png",
              "/images/about/3.png",
              "/images/about/4.png",
              "/images/about/5.png",
              "/images/about/6.png",
            ]}
          />
          <div className="w-full h-full flex flex-col flex-1 justify-between items-start gap-4 md:text-xl text-sm text-justify mt-10 px-4">
            <h2 className="font-sinister text-3xl">What is Ayurveda?</h2>

            {/* text content */}
            <div className="flex flex-col md:flex-row h-full md:gap-10 gap-4 flex-1">
              <div className="flex flex-col w-full h-full md:w-1/2 gap-4">
                <p className="w-full">
                  Ayurveda, an indigenous ancient medical science of India, is
                  more than 5000 years old. It is considered to be an upveda of
                  Atharva Veda. Mention of use of herbs for medicinal purpose is
                  found in the oldest available written literature of world,
                  Rigveda.Literally, the word Ayurveda is a combination of two
                  words: Ayu + Veda.
                </p>
                <p className="w-full">
                  It is a science of health based on universal principles and
                  profound insights into the connection between mind and body
                  and the laws of nature which structure all progress in life.
                  It is promising to see that this ancient Vedic wisdom is now
                  becoming more widely sought after.
                </p>
              </div>

              <p className="md:w-1/2">
                Ayu means life and Veda means the science. Thus Ayurveda is a
                science of life and not only science of diseases. The aim of
                Ayurveda is “Swasthasya Swasthya rakshnam, aturasya vikara
                prashaman” i.e. propagation of health and cure of diseases. The
                faith in the power of its principles along with the availability
                of a vast majority of herbs in India has always been a thrust
                behind survival of this scientific art of healing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute top-[10%] inset-0 w-full px-16 overflow-hidden">
        <ImageMarqueeScroll
          baseVelocity={4}
          height={320}
          images={[
            "/images/about/1.png",
            "/images/about/2.png",
            "/images/about/3.png",
            "/images/about/4.png",
            "/images/about/5.png",
            "/images/about/6.png",
          ]}
        />
      </div> */}
    </section>
  );
};

export default About;

{
  /* <div className="absolute top-[14%] left-10 max-w-xl px-4 overflow-hidden z-0">
        <ImageMarqueeScroll
          baseVelocity={6}
          height={250}
          images={[
            "/images/about/1.png",
            "/images/about/2.png",
            "/images/about/3.png",
            "/images/about/4.png",
            "/images/about/5.png",
            "/images/about/6.png",
          ]}
        />
      </div> */
}
