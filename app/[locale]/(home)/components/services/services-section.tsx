"use client";

import { ServiceCard, ServiceItem } from "./service-card";
import { SectionHeader } from "@/components/section-header";
import { useTranslations } from "next-intl";

const services: ServiceItem[] = [
    {
        id: "sms-api",
        title: "SMS  optimization",
        image: "/services/sms.svg",
        href: "/docs?search=sms%20api",
        variant: "white",
        mobilevariant: "blue",
    },
    {
        id: "email-marketing",
        title: "Email Marketing",
        image: "/services/email.svg",
        href: "/docs?search=email%20marketing",
        variant: "blue",
        mobilevariant: "white",
    },
    {
        id: "cloud-storage",
        title: "Cloud Storage",
        image: "/services/storage.svg",
        href: "/docs?search=cloud%20storage",
        variant: "blue",
        mobilevariant: "blue",
    },
    {
        id: "ai-tokens",
        title: "Models Tokens",
        image: "/services/api.svg",
        href: "/docs?search=ai%20tokens",
        variant: "white",
        mobilevariant: "white",
    },
    {
        id: "local-billing",
        title: "Local Billing system",
        image: "/services/billing.svg",
        href: "/docs?search=local%20billing",
        variant: "white",
        mobilevariant: "blue",
    },
    {
        id: "developer-dashboard",
        title: "Developer Dashboard",
        image: "/services/dashboard.svg",
        href: "/docs?search=developer%20dashboard",
        variant: "blue",
        mobilevariant: "white",
    },
];

export function ServicesSection() {
    const t = useTranslations("home.services");

    return (
        <section
            id="services"
            className="bg-background px-4 py-16 md:py-24 md:px-6 lg:px-8 scroll-mt-24 "
        >
            <div className="mx-auto max-w-7xl sm:px-6">

                <SectionHeader
                    badge={t("badge")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}