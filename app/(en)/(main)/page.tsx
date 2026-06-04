import { Navbar } from "./components/navbar/navbar";
import { HeroSection } from "./components/hero/Hero";
import { TrailSection } from "./components/trail/trail-section";
import { ServicesSection } from "./components/services/services-section";
import { CodeExampleSection } from "./components/code-block/code-example-section";
import { PricingSection } from "./components/pricing-section";
import { FAQSection } from "./components/faq-section";
import { ContactSection } from "./components/contact-section";
import { FooterSection } from "./components/footer-section";
import { CaseStudiesSection } from "./components/case-studies-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrailSection />
      <ServicesSection />
      <CodeExampleSection />
      <CaseStudiesSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
