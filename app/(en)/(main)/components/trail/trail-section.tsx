"use client";

import React from "react";
import { HeroVideoDefault } from "@/app/(en)/(main)/components/trail/hero-video-default";

export default function TrailSection() {
    return (
        <section className="w-full py-4 md:py-16 flex justify-center">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* TOP */}
                    <div className="flex flex-col gap-6 mb-10 md:mb-16 items-center sm:items-start text-center sm:text-left">

                        {/* ROW */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 items-center sm:items-start">

                            {/* CARD */}
                            <div className="bg-foreground text-background text-2xl sm:text-3xl md:text-4xl px-3 py-2 font-semibold w-fit rounded-md">
                                Specific
                            </div>

                            {/* TITLE */}
                            <div className=" px-3 ">
                                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-foreground leading-snug max-w-xs sm:max-w-64 text-center sm:text-left">
                                    Built for Developers Across All Algerian Wilayas
                                </h2>
                            </div>


                        </div>
                    </div>
                </div>

                {/* VIDEO */}
                <div className=" flex w-full  items-center justify-center">
                    <div className=" bg-amber-300 w-full  flex h-full justify-center items-center rounded-2xl overflow-hidden">

                        {/* LIGHT */}
                        <HeroVideoDefault
                            className="dark:hidden flex w-full"
                            videoSrc="https://www.youtube.com/embed/cjZjqP3EqdE?si=wXqy8Rpcnwll8Grr&amp;start=360"
                            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                            thumbnailAlt="Hero Video"
                            enableSound={false}
                        />

                        {/* DARK */}
                        <HeroVideoDefault
                            className="hidden dark:flex w-full"
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