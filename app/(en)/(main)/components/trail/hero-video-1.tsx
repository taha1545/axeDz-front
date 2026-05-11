import { HeroVideoDefault } from "@/app/(en)/(main)/components/trail/hero-video-default";
import React from "react";

export default function HeroVideoOne() {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="flex flex-col items-center justify-center py-12">
                <HeroVideoDefault
                    className="dark:hidden block"
                    videoSrc="https://www.youtube.com/embed/cjZjqP3EqdE?si=wXqy8Rpcnwll8Grr&amp;start=360"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                    enableSound={false}
                />
                <HeroVideoDefault
                    className="hidden dark:block"
                    videoSrc="https://www.youtube.com/embed/cjZjqP3EqdE?si=wXqy8Rpcnwll8Grr&amp;start=360"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                    enableSound={false}
                />
            </div>
        </div>
    );
}
