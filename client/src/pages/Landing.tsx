import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Included from "../components/Included";
import Pricing from "../components/Pricing";
import Works from "../components/Works";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Included />
        <Pricing />
        <Works />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
