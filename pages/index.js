import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Blogs,
} from "@/components";
import HeroBackground from "@/components/HeroBackground";
import UpArrow from "./../public/assets/icons/up-arrow.svg";
import Services from "@/components/Services";

// Lazy load heavy components
const Works = dynamic(() => import("@/components/Works"), {
  ssr: true,
  loading: () => (
    <div className="xl:my-36 md:mx-36 p-8 min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-ctnSecondaryDark">Loading projects...</div>
    </div>
  ),
});

const StarsCanvas = dynamic(
  () => import("@/components").then((mod) => mod.StarsCanvas),
  { ssr: false }
);

const EarthContainer = dynamic(() => import("@/components/EarthContainer"), {
  ssr: false,
  loading: () => (
    <div className="xl:w-1/2 w-full md:w-2/3 md:h-auto h-[550px] flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary to-tertiary opacity-40 animate-pulse" />
    </div>
  ),
});

const PlayerContainer = dynamic(() => import("@/components/PlayerContainer"), {
  ssr: false,
  loading: () => (
    <div className="md:w-1/3 w-full md:h-auto h-[440px] flex items-center justify-center">
      <div className="w-36 h-36 rounded-full bg-gradient-to-r from-primary to-tertiary opacity-40 animate-pulse" />
    </div>
  ),
});

function App({ loading }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <main className="relative z-0 w-full h-full">
      <div className=" bg-cover bg-no-repeat bg-center">
        <Navbar />
        <HeroBackground />
        <Hero loading={loading} isMobile={isMobile} />
      </div>
      <section className="relative z-0 flex md:flex-row flex-col-reverse w-full h-full overflow-hidden">
        <About />
        {!isMobile && <PlayerContainer isMobile={isMobile} />}
      </section>
      <Services />
      <Experience />
      <Tech />
      <Works />
      <Blogs />
      {/* <Feedbacks /> */}
      <section className="relative z-0 flex md:flex-row justify-between flex-col-reverse w-full h-full overflow-x-hidden sm:p-8 p-2 pb-8">
        <Contact />
        <EarthContainer isMobile={isMobile} />
        <StarsCanvas />
      </section>
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
        className="fixed md:w-10 md:h-10 h-8 w-8 p-2 bottom-8 md:right-10 right-8 text-center text-secondary backdrop-filter backdrop-blur-xl bg-opacity-20 bg-tertiary rounded-lg hover:scale-110 transition-all duration-300"
      >
        <UpArrow />
      </button>
    </main>
  );
}

export default App;
