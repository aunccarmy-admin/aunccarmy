import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectPoster } from "@/db/schema";
import CldImage from "../common/cld-image";
import { formatInTimeZone } from "date-fns-tz";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const PosterCard = ({
  poster,
  isCarouselCard = false,
}: {
  poster: SelectPoster;
  isCarouselCard?: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "aspect-square h-auto cursor-pointer rounded border bg-muted transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
            isCarouselCard
              ? "w-[290px]"
              : "w-[140px] sm:w-[180px] lg:w-[192px]",
          )}
        >
          <CldImage
            src={poster.public_id}
            alt={poster.alt ?? "Poster"}
            className="h-auto w-full"
            width={192}
            height={192}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="z-[150] p-3 lg:max-w-5xl">
        <div className="flex flex-col lg:flex-row lg:pr-2">
          <div className="grid aspect-square w-full max-w-xl place-content-center rounded-sm lg:border-2 lg:bg-muted">
            <CldImage
              src={poster.public_id}
              alt={poster.alt ?? "Poster"}
              width={720}
              height={720}
              aspectRatio={1}
              className="mt-8 aspect-square w-full rounded lg:mt-0"
            />
          </div>
          <div className="lg:max-w-md">
            <DialogHeader className="hidden border-b-2 p-4 lg:flex">
              <DialogTitle>
                {poster.name && poster.name.length > 0 ? poster.name : "Poster"}
              </DialogTitle>
              <DialogDescription hidden>
                {poster.date
                  ? formatInTimeZone(
                      poster.date,
                      "Asia/Kolkata",
                      "MMMM dd, yyyy",
                    )
                  : "No date provided"}
              </DialogDescription>
            </DialogHeader>
            <div className="hidden h-[460px] overflow-y-auto p-4 lg:block">
              <p className="whitespace-pre-wrap">{poster.description}</p>
            </div>
            <DialogFooter className="flex flex-col justify-center gap-4 border-t-2 pb-2 pl-4 pr-2 pt-3 sm:justify-between">
              <div className="w-fit">
                <span className="text-sm text-muted-foreground">
                  {poster.date
                    ? formatInTimeZone(
                        poster.date,
                        "Asia/Kolkata",
                        "MMMM dd, yyyy",
                      )
                    : "No date provided"}
                </span>
              </div>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-sm"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PosterCard;

export const PosterCardSkeleton = ({
  isCarouselCard = false,
}: {
  isCarouselCard?: boolean;
}) => {
  return (
    <div
      className={cn(
        "aspect-square h-auto rounded",
        isCarouselCard ? "w-[290px]" : "w-[140px] sm:w-[180px] lg:w-[192px]",
      )}
    >
      <Skeleton
        className={cn(
          "aspect-square h-auto rounded",
          isCarouselCard ? "w-[290px]" : "w-[140px] sm:w-[180px] lg:w-[192px]",
        )}
      ></Skeleton>
    </div>
  );
};
