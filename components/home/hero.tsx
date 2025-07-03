import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { SectionHeadingTag } from "@/components/common/section-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroLogos } from "@/resources/hero";
import {
  FourCornerBoxes,
  RDiamond,
  RPlus,
} from "@/components/common/decoration";

const Hero = () => {
  return (
    <section className="mx-auto h-fit max-w-8xl px-2">
      <div className="border-x pt-8 sm:px-4 xs:px-2">
        <div className="relative mx-auto h-fit w-fit">
          <FourCornerBoxes
            className="z-30 hidden border bg-background sm:grid"
            child={<RPlus />}
          />
          <div className="mx-auto grid h-fit max-w-7xl grid-cols-12 overflow-clip border-2 bg-gradient-to-b from-muted/40 via-muted/60 to-muted/20 px-4 backdrop-blur-sm">
            <HeroContent />
            <HeroImage />
          </div>
        </div>
      </div>
      <HeroFooter />
    </section>
  );
};

const HeroContent = () => {
  const nccFlag = "/images/logos/ncc_f_1.png";

  return (
    <div className="col-span-12 flex flex-col items-center pb-12 pt-12 lg:col-span-6 lg:items-start lg:pb-2 2xl:col-span-6">
      <SectionHeadingTag
        className="mx-0 bg-background/60 text-foreground"
        CustomIcon={
          <div className="mr-1 flex items-center">
            <Image
              width={20}
              height={15}
              src={nccFlag}
              blurDataURL={nccFlag.replace("images", "min_images")}
              alt="NCC Flag"
            />
          </div>
        }
        title={"National Cadet Corps"}
      />
      <div className="mt-3">
        <h1 className="max-w-[360px] text-center text-[1.70em] font-bold leading-tight text-gray-900 dark:text-slate-200 sm:text-[2em] md:max-w-[420px] md:text-[2.5em] lg:max-w-[580px] lg:text-start lg:text-[2.75em] xl:max-w-[620px] xl:text-[3.6em] 2xl:text-[3.75em]">
          Empowering{" "}
          <span className="font-extrabold text-rose-700 dark:text-rose-500">
            youth
          </span>
          , shaping new{" "}
          <span className="font-extrabold text-blue-700 dark:text-blue-500">
            leaders
          </span>
          , securing the{" "}
          <span className="font-extrabold text-sky-700 dark:text-sky-500">
            future
          </span>
          .
        </h1>
      </div>
      <br />
      <p className="max-w-md px-1 pr-2 text-center text-sm font-medium text-muted-foreground dark:font-normal md:max-w-xl lg:text-start lg:text-base">
        Prepare for a lifetime of leadership and excellence. Embrace challenges,
        seize opportunities, and create lasting memories on a journey of courage
        and service.
      </p>
      <br />
      <div className="flex w-full max-w-sm flex-col gap-3 px-4 lg:flex-row lg:gap-4 lg:px-0">
        <Button
          size={"xl"}
          className="w-full border-2 border-foreground/10 dark:font-bold"
        >
          Start Your Journey
        </Button>
        <Link
          href="/about"
          aria-label="Learn more about NCC"
          className={cn(
            buttonVariants({ variant: "secondary", size: "xl" }),
            "w-full border-2 border-foreground/10 dark:font-medium",
          )}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const HeroImage = () => {
  const nccShoulder = "/images/wallpapers/ncc_shoulder.png";
  return (
    <div className=" col-span-0 hidden animate-in fade-in-0 sm:col-span-5 lg:col-span-5 lg:block 2xl:col-span-6">
      <div className="relative overflow-clip border-l-4 border-muted drop-shadow-md md:h-[500px] md:w-[700px] xl:h-[530px] xl:w-[760px] 2xl:h-[560px] 2xl:w-[780px]">
        <Image
          src={nccShoulder}
          blurDataURL={nccShoulder.replace("images", "min_images")}
          placeholder="blur"
          layout="fill"
          alt="NCC shoulder badge on uniform with Anna University Red building in the background"
        />
      </div>
    </div>
  );
};

const HeroFooter = () => (
  <div className="relative flex flex-col gap-6 border-x border-t">
    <FourCornerBoxes className="z-30" child={<RDiamond />} />
    <div className="mx-auto flex select-text flex-wrap justify-center gap-12 gap-y-4 px-8 pt-8 md:gap-12 md:px-0 lg:gap-24">
      {heroLogos.map((image: any, index: number) => (
        <div
          key={index}
          className={`flex h-auto w-[20%] min-w-20 items-center justify-center drop-shadow-sm sm:w-fit p-${image.padding}`}
        >
          <Image
            height={image.height}
            width={image.width}
            blurDataURL={image.src.replace("images", "min_images")}
            placeholder="blur"
            src={image.src}
            alt={image.alt}
          />
        </div>
      ))}
    </div>
    <div className="px-4 pb-6">
      <p className="mx-auto max-w-2xl text-center text-sm font-medium text-muted-foreground dark:font-normal sm:text-base">
        Creating organized, trained, and motivated youth, equipped to provide
        leadership in every sphere of life, and unwaveringly committed to
        serving our nation.
      </p>
    </div>
  </div>
);

export default Hero;
