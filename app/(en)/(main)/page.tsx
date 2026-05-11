import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/Hero";
import TrailSection from "./components/trail/trail-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrailSection />
    </>
  );
}
