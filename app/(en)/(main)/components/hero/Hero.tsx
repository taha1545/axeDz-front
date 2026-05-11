"use client";

import Image from "next/image";
import Link from "next/link";
import { RotatingWords } from "./rotating-words";
import { HeroBgSquares } from "./hero-bg-squares";

const WORDS = ["developers", "businesses", "startups", "enterprises"];

export function Hero() {
    return (
        <section className="relative flex w-full items-center justify-center py-10 md:py-10 overflow-hidden">

            {/* BACKGROUND DECORATION */}
            <div className="hidden sm:block">
                <HeroBgSquares />
            </div>

            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">

                    {/* LEFT */}
                    <div className="flex flex-col text-center md:text-left">

                        <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-foreground mb-5">
                            Powering communication for <br />
                            Algerian{" "}
                            <span className="text-primary inline-flex relative h-[1.1em] overflow-hidden align-bottom">
                                <RotatingWords words={WORDS} />
                            </span>
                        </h1>

                        <div className="mt-6 md:mt-8">

                            <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                                AxeDz is a unified CPaaS platform that lets you send SMS, Emails,
                                and manage Cloud Storage{" "}
                                <span className="text-foreground/80 font-semibold">
                                    using a single API
                                </span>{" "}
                                billed locally in{" "}
                                <span className="text-foreground/80 font-semibold">
                                    Algerian Dinars (DZD).
                                </span>
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start w-full sm:w-auto">

                                <Link
                                    href="/start"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    Try for free
                                </Link>

                                <Link
                                    href="/discover"
                                    className="w-full sm:w-auto inline-flex items-center justify-center py-3 gap-2 text-foreground/80 font-semibold hover:text-primary transition-colors duration-200"
                                >
                                    Discover
                                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                            </div>

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-full max-w-md md:max-w-lg aspect-square">
                            <Image
                                src="/hero-image.svg"
                                alt="AxeDz platform illustration"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}