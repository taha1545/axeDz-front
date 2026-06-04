'use client';

import Link from 'next/link';
import { HeroImage } from "@/components/hero-image";
import { HeroImage2 } from "@/components/hero-image-2";
import { RotatingWords } from './rotating-words';
import { HeroGridLines } from './hero-grid-lines';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';


//
const WORDS = ['developers', 'businesses', 'startups', 'enterprises'];
//



export function HeroSection() {

  return (
    <section className="relative flex min-h-[calc(100vh-var(--navbar-height))] w-full items-center overflow-hidden py-3 md:py-7">



      {/* Content */}
      <div className="relative z-10 mx-auto w-full  md:max-w-7xl px-4 sm:px-10 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-14"
        >
          {/* Text */}
          <div className="flex flex-col text-center md:text-left">
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } } }}
              className="text-[2rem]  md:text-[2.75rem] lg:text-[3.5rem] 
              font-bold leading-[1.1] tracking-tight text-foreground"
            >
              Powering communication for{' '}
              Algerian{' '}
              <span className="inline-block text-primary">
                <RotatingWords words={WORDS} />
              </span>
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } } }}
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0 md:mt-8 md:text-lg"
            >
              AxeDz is a unified CPaaS platform that lets you send SMS, Emails,
              and manage Cloud Storage{' '}
              <span className="font-semibold text-foreground">using a single API</span>{' '}
              billed locally in{' '}
              <span className="font-semibold text-foreground">Algerian Dinars (DZD).</span>
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } } }}
              className="mt-8 flex flex-col items-center lg:gap-4 md:flex-row md:mt-10 md:items-start"
            >
              <Link
                href="/dashboard"
                className={cn(
                  'inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 ',
                  'bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20',
                  'transition-all duration-200 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98]',
                  'md:w-auto lg:px-10 md:px-6 md:py-4 md:text-base'
                )}
              >
                Try for free
              </Link>
              <Link
                href="/docs"
                className={cn(
                  'group inline-flex w-full items-center justify-center gap-2 rounded-full  px-6 py-4',
                  'text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary',
                  'md:w-auto md:px-6 md:text-base  hover:border-primary',
                )}
              >
                Discover
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Images */}
          <div
            className="flex w-full items-start justify-between relative  md:min-h-130 lg:min-w-153"
            style={{ perspective: 1400 }}
          >
            {/* back Card */}
            <motion.div
              className="absolute  hidden md:flex"
              style={{
                left: "0%",
                bottom: "11%",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.4))",
                zIndex: 1,
              }}
              initial={{ opacity: 0, x: -60, y: 30, scale: 0.95, rotateY: -25 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateY: -15 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div
                style={{
                  transform:
                    "rotateY(-20deg) rotateX(20deg) translateZ(40px) scale(0.96)",
                }}
              >
                <HeroImage2 />
              </div>
            </motion.div>

            {/* Front Card */}
            <motion.div
              className="absolute  hidden md:flex "
              style={{
                right: "4%",
                bottom: "4%",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 35px 50px rgba(0,0,0,0.45)) ",
                zIndex: 2,
              }}
           
            >
              <div
                style={{
                  transform:
                    "rotateY(0deg) rotateX(5deg) translateZ(40px) scale(0.99)",
                }}
              >
                <HeroImage />
              </div>
            </motion.div>
          </div>



        </motion.div>
      </div>
    </section>
  );
}
