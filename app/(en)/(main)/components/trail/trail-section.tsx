"use client";

import React from "react";
import { HeroVideoDefault } from "@/app/(en)/(main)/components/trail/hero-video-default";

export default function TrailSection() {
    return (
        <section className="w-full py-3 md:py-3 flex justify-center">

            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* TOP TEXT  */}
                <div className="flex flex-col items-start text-center gap-6 mb-17 pl-2">

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5">

                        {/* SPECIFIC CARD */}
                        <div className="bg-foreground text-background text-4xl px-1 py-1  font-semibold">
                            Specific
                        </div>

                        {/* TITLE */}
                        <h2 className="text-base font-semibold  text-start text-foreground leading-tight max-w-50">
                            Built for Developers Across All Algerian Wilayas
                        </h2>

                    </div>

                </div>

                {/* VIDEO */}
                <div className="w-full flex justify-center">

                    <div className="w-full max-w-5xl">

                        {/* LIGHT */}
                        <HeroVideoDefault
                            className="dark:hidden block w-full"
                            videoSrc="https://www.youtube.com/embed/cjZjqP3EqdE?si=wXqy8Rpcnwll8Grr&amp;start=360"
                            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                            thumbnailAlt="Hero Video"
                            enableSound={false}
                        />

                        {/* DARK */}
                        <HeroVideoDefault
                            className="hidden dark:block w-full"
                            videoSrc="https://www.youtube.com/embed/cjZjqP3EqdE?si=wXqy8Rpcnwll8Grr&amp;start=360"
                            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                            thumbnailAlt="Hero Video"
                            enableSound={false}
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}