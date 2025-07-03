import React, {
  ComponentPropsWithRef,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";
import { cn } from "@/lib/utils";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      type="button"
      // Add relative, and use before for invisible touch area
      className={cn(
        "relative flex items-center justify-center",
        "before:pointer-events-auto before:absolute before:inset-[-12px] before:bg-transparent before:content-['']",
        className,
      )}
      style={{ minWidth: 0, minHeight: 0, padding: 0 }}
      {...restProps}
    >
      {children}
    </button>
  );
};

type UseAutoplayProgressType = {
  showAutoplayProgress: boolean;
};

export const useAutoplayProgress = <ProgressElement extends HTMLElement>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement>,
): UseAutoplayProgressType => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);

  const startProgress = useCallback(
    (timeUntilNext: number | null) => {
      const node = progressNode.current;

      if (!node) return;
      if (timeUntilNext === null) return;

      if (!animationName.current) {
        const style = window.getComputedStyle(node);
        animationName.current = style.animationName;
      }

      node.style.animationName = "none";
      node.style.transform = "translate3d(0,0,0)";

      rafId.current = window.requestAnimationFrame(() => {
        timeoutId.current = window.setTimeout(() => {
          node.style.animationName = animationName.current;
          node.style.animationDuration = `${timeUntilNext}ms`;
        }, 0);
      });

      setShowAutoplayProgress(true);
    },
    [progressNode],
  );

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi, startProgress]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    showAutoplayProgress,
  };
};

type AutoplayButtonType = {
  showAutoplayProgress: boolean;
  progressNode: React.RefObject<HTMLDivElement>;
};

export const AutoplayProgress: React.FC<AutoplayButtonType> = (props) => {
  const { showAutoplayProgress, progressNode } = props;

  return (
    <div
      className={cn(
        "relative h-1.5 w-48 max-w-[90%] self-center justify-self-center overflow-hidden rounded-full bg-background transition-opacity duration-300 ease-in-out",
        "shadow-[inset_0_0_0_0.2rem_hsl(var(--muted))]",
        showAutoplayProgress ? "" : "opacity-0 first:paused",
      )}
    >
      <div
        ref={progressNode}
        className="absolute inset-y-0 left-[-100%] w-full animate-autoplay-progress bg-foreground"
      />
    </div>
  );
};
