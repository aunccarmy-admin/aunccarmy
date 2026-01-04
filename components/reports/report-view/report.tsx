import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import ReportCarousel from "./carousel-preview";
import ContentPreview from "./content-preview";
import { Slide } from "@/types";
import { SelectReport } from "@/db/schema";

const ReportView = ({ report }: { report: SelectReport }) => {
  return (
    <div className="w-full sm:border-x">
      <main className="mx-auto max-w-5xl overflow-clip border-x bg-gradient-to-b from-muted/40 via-muted/20 to-muted/40 pt-12 md:px-12">
        <div className="pl-4 pr-3 text-foreground/40 dark:text-foreground/20">
          <div className="flex gap-4">
            <h1
              className={cn(
                "text-4xl font-bold",
                report.title && "text-foreground",
              )}
            >
              {report.title}
            </h1>
          </div>
          <hr className="my-3" />
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-2 text-sm font-medium">
            <span className={cn(report.location && "text-muted-foreground")}>
              {report.location}
            </span>
            <span className={cn(report.date && "text-muted-foreground")}>
              {report.date
                ? formatInTimeZone(report.date, "Asia/Kolkata", "PPP")
                : ""}
            </span>
          </div>

          <div className="mt-6">
            <ReportCarousel slides={(report.images as Slide[]) ?? []} />
          </div>

          <ContentPreview content={report.content} />
        </div>
      </main>
    </div>
  );
};

export default ReportView;
