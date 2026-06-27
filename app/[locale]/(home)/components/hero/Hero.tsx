import Link from "next/link";
import { useTranslations } from "next-intl";
import { RotatingWords } from "./rotating-words";
import { HeroGridLines } from "./hero-grid-lines";
import { ArrowRight } from "lucide-react";
import { HeroCodeStack } from "./hero-code-stack";
import { PrimaryButton, NormalButton } from "@/components/custom-button";

const ROTATING_WORDS = ["developers", "businesses", "startups", "enterprises"] as const;

export function HeroSection() {
  //
  const t = useTranslations("home.hero");

  const words = ROTATING_WORDS.map((key) => t(`words.${key}`));

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative flex   w-full  items-center overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <HeroGridLines />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-12 ">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-12 ">

          {/*  Text Content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-start">

            {/* Title */}
            <h1 className=" font-bold leading-[1.15] tracking-tight text-foreground  text-[2rem] md:text-[2.75rem] xl:text-[3.5rem]">
              {t("title.prefix")}{" "}
              <span className="text-foreground">{t("title.highlight")}</span>{" "}
              <span className="inline-block text-primary">
                <RotatingWords words={words} />
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7 md:mt-5 md:max-w-md md:text-base xl:mt-10  xl:text-base xl:max-w-xl">
              {t.rich("description", {
                strong: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
              })}
            </p>

            {/* CTAs */}
            <div className="mt-6 flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:justify-center md:mt-8 md:justify-start md:gap-3 lg:mt-10 lg:gap-4">
              <PrimaryButton
                text={t("cta.primary")}
                asChild
                className="h-11 w-full justify-center rounded-full px-6 text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98] sm:h-12 sm:w-auto sm:px-8 md:h-12 md:px-7 lg:h-14 lg:px-10 lg:text-base"
              >
                <Link href="/dashboard" />
              </PrimaryButton>

              <NormalButton
                text={t("cta.secondary")}
                asChild
                iconEnd={
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                }
                className="group h-11 w-full justify-center rounded-full px-6 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:h-12 sm:w-auto md:h-12 md:px-7 lg:h-14 lg:px-8 lg:text-base"
              >
                <Link href="/docs" />
              </NormalButton>
            </div>
          </div>

          {/* Right: Code Cards */}
          <div
            className="relative hidden w-full md:flex" >
            <HeroCodeStack />
          </div>

        </div>
      </div>
    </section>
  );
}