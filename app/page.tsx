"use client";

import { IParallax, Parallax } from "@react-spring/parallax";
import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import LoadingScreen from "./components/LoadingScreen";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Footer from "./Footer";
import BackToTopButton from "./components/BackToTopButton";
import BackgroundColor from "./components/BackgroundColor";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const parallaxRef = useRef<IParallax>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [isTop, setIsTop] = useState(true);

  const handleScroll = () => {
    if (parallaxRef.current) {
      const scrollTop = parallaxRef.current.container.current.scrollTop;
      const pageHeight = parallaxRef.current.space;
      setIsTop(10 * scrollTop < 9 * pageHeight);
    }
  };

  useEffect(() => {
    const container = parallaxRef.current?.container.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <main>
      {loading && <LoadingScreen />}

      <BackToTopButton
        parallaxRef={parallaxRef}
        className={isTop ? "translate-x-40 opacity-0" : "opacity-100"}
      />
      <Parallax
        ref={parallaxRef}
        pages={4.1}
        style={{ top: "0", left: "0" }}
        className="p-animation bg-blue-9"
      >
        <Hero parallaxRef={parallaxRef} />

        <BackgroundColor color="#00131c" offset={1} />
        <BackgroundColor color="#00131c" offset={2} />
        <BackgroundColor color="#00131c" offset={3} factor={1.1} />

        <About />
        <Projects />
        <Skills />
        <Footer />
      </Parallax>
    </main>
  );
}
