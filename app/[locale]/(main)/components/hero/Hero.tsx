'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RotatingWords } from './rotating-words';
import { HeroBgSquares } from './hero-bg-squares';
import { HeroGridLines } from './hero-grid-lines';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const WORDS = ['developers', 'businesses', 'startups', 'enterprises'];



export function HeroSection() {

  return (
    <section className="relative flex min-h-[calc(100vh-var(--navbar-height))] w-full items-center overflow-hidden py-0 md:py-7">

      <div className="hidden md:block ">
        {/* <HeroBgSquares /> */}
        <HeroGridLines />
      </div>

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

          {/* Illustration */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="hidden md:flex md:justify-end w-full h-full"
          >
            <div className=" relative aspect-square w-full h-full  ">
              <Image
                src="/hero-image.svg"
                alt="AxeDz platform illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
