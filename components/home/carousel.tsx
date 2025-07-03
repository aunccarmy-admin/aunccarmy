"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EmblaCarousel, {
  CarouselRef,
} from "../common/carousel/embla-carousel-view";
import { useMutation } from "@tanstack/react-query";
import { getCarousel } from "@/db/queries/select";
import Lightbox, {
  LightboxHandle,
  LightboxImage,
  LightboxRenderContext,
  LightboxRenderProps,
} from "../common/lightbox/lightbox";
import CldImage from "../common/cld-image";
import { SelectSlide } from "@/db/schema";
import { FullscreenIcon } from "lucide-react";
import { Button } from "../ui/button";

const slideWidth = "90%";
const slideAspectRatio = "30/13";
const slideSpacing = "clamp(8px,2vw,2rem)";

const HomeCarousel = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const lightboxRef = useRef<LightboxHandle>(null);
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [images, setImages] = useState<SelectSlide[]>([]);
  const [slides, setSlides] = useState<React.ReactElement[]>([]);

  const { isPending, mutate: getSlides } = useMutation({
    mutationKey: ["getCarousel"],
    mutationFn: getCarousel,
    onSuccess: (data) => {
      setImages(data);
      setSlides(
        data.map((slide, index) => {
          return (
            <div
              key={index}
              className={`group relative h-full cursor-pointer select-none overflow-clip rounded-2xl bg-primary/10`}
              onClick={() => handleImageClick(index)}
            >
              <CldImage
                src={slide.public_id}
                alt={slide.alt ?? ""}
                width={1900}
                height={800}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute bottom-2 right-2 rounded-sm opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100"
                aria-label="Open in fullscreen"
              >
                <FullscreenIcon />
              </Button>
            </div>
          );
        }),
      );
    },
    onError: (error) => {
      console.error("Failed to fetch slides:", error);
    },
  });

  const handleImageClick = (index: number) => {
    carouselRef.current?.stopAutoplay();
    lightboxRef.current?.openLightbox(index);
  };
  const handleLightboxClose = () => {
    carouselRef.current?.startAutoplay();
  };

  const renderLightboxImage = (
    props: LightboxRenderProps,
    context: LightboxRenderContext,
  ) => {
    const { alt, public_id } = context.image;

    return (
      <div className="grid h-full place-content-center">
        <CldImage
          src={public_id}
          alt={alt}
          onLoad={props.onLoad}
          fill
          className="object-contain"
        />
      </div>
    );
  };

  useEffect(() => {
    getSlides();
    setIsDomLoaded(true);
  }, [isDomLoaded, getSlides]);

  if (!isDomLoaded || isPending) {
    return <HomeCarouselSkeleton />;
  }

  const lightboxImages: LightboxImage[] = images.map((image) => ({
    ...image,
    src: image.public_id,
    alt: image.alt ?? "",
    caption: image.caption || undefined,
    public_id: image.public_id,
  }));

  return (
    <div className="max-w-9xl relative overflow-x-clip border-y bg-background px-4 pt-6">
      <div className="mx-auto max-w-6xl">
        <EmblaCarousel
          ref={carouselRef}
          slides={slides}
          autoplay={true}
          slideWidth={slideWidth}
          slideAspectRatio={slideAspectRatio}
          slideSpacing={slideSpacing}
          showProgress={true}
        />
        <Lightbox
          ref={lightboxRef}
          images={lightboxImages}
          loop
          render={{ image: renderLightboxImage }}
          onClose={handleLightboxClose}
        />
      </div>
    </div>
  );
};

export default HomeCarousel;

export const HomeCarouselSkeleton = () => {
  return (
    <div className="max-w-9xl relative overflow-x-clip border-y bg-background px-2 pt-6">
      <div
        className="mx-auto flex max-w-7xl py-2"
        style={{
          gap: slideSpacing,
        }}
      >
        <Skeleton className="h-auto w-[7.5%]" />
        <Skeleton
          className="w-[85%]"
          style={{
            aspectRatio: slideAspectRatio,
          }}
        />
        <Skeleton className="h-auto w-[7.5%]" />
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-center pb-4 pt-3 sm:justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="hidden gap-1.5 sm:flex">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};
