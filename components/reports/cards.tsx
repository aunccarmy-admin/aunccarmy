import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { ReportMeta } from "@/db/queries/select";
import CldImage from "@/components/common/cld-image";
import { ImageIcon, ImageOff } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export const ReportCard = ({
  report,
  showThumbnail = true,
}: {
  report: ReportMeta;
  showThumbnail?: boolean;
}) => {
  const { thumb } = report;
  return (
    <Link href={`events/reports/${report.slug}`} className="group">
      <Card className="w-72 overflow-clip transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
        <div className="aspect-[320/180] w-full border-b">
          {showThumbnail && (
            <>
              {thumb ? (
                <CldImage
                  src={thumb}
                  width={320}
                  height={180}
                  alt={report.title ?? "Report thumbnail"}
                  className="h-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-muted/50">
                  <ImageOff className="mx-auto my-auto h-24 w-24 text-border" />
                </div>
              )}
            </>
          )}
        </div>
        <CardHeader className="border-b p-3">
          <CardTitle className="w-full truncate text-lg">
            {report.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col text-sm text-muted-foreground">
            <address className="w-full truncate p-3 not-italic">
              {report.location}
            </address>
            <time
              className="self-end rounded-tl-sm border border-border/50 bg-muted/20 p-2 py-1 text-xs tracking-wide"
              dateTime={report.date?.toISOString()}
            >
              {report.date
                ? formatInTimeZone(report.date, "Asia/Kolkata", "PPP")
                : ""}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const ReportCardSkeleton = () => {
  return (
    <div className="h-full w-full max-w-[18rem] overflow-clip rounded-md border">
      <Skeleton className="grid aspect-[320/180] w-72 place-content-center rounded-b-none bg-muted/50">
        <ImageIcon className="mx-auto my-auto h-24 w-24 text-border" />
      </Skeleton>
      <div className="border-b p-4 px-3">
        <Skeleton className="h-4 w-36 rounded-sm" />
      </div>
      <div className="p-4 px-3">
        <Skeleton className="h-4 w-full rounded-sm bg-muted/50" />
      </div>
      <div className="flex w-full justify-end">
        <Skeleton className="h-4 w-24 rounded-none rounded-tl-sm opacity-30" />
      </div>
    </div>
  );
};
