import { Navbar } from "./components/navbar/navbar";
import { HeroSection } from "./components/hero/Hero";

import { getPageMetadata, type Locale } from "@/lib/metadata";
import { TrailSection } from "./components/trail/trail-section";
import { ServicesSection } from "./components/services/services-section";
import { CodeExampleSection } from "./components/code-block/code-example-section";
import { CaseStudiesSection } from "./case-exmple/case-studies-section";
import { PricingSection } from "./components/pricing-section";
import { FAQSection } from "./components/faq-section";
import { ContactSection } from "./components/contact-section";
import { FooterSection } from "./components/footer-section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata("/", locale as Locale);
}

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
