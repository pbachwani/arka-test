import KYP from "@/components/KYP";
import HeroReveal from "./HeroReveal";
import About from "@/components/About";

const Home = () => {
  return (
    <main className="w-full h-full mx-auto min-h-screen">
      <HeroReveal />
      <About />
      <KYP />
      <div className="h-screen w-full flex justify-center items-center bg-red-300">
        Section 3
      </div>
      <div className="h-screen w-full flex justify-center items-center bg-green-300">
        Section 4
      </div>
      <div className="h-screen w-full flex justify-center items-center bg-blue-300">
        Section 5
      </div>
    </main>
  );
};

export default Home;
