import { getReportBySlug, getReports } from "@/db/queries/select";
import { notFound } from "next/navigation";
import { getCldImageUrl } from "next-cloudinary";
import ReportView from "@/components/reports/report-view/report";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";

export const revalidate = 60;

export async function generateStaticParams() {
  const reports = await getReports();

  return reports.map((report) => ({
    slug: report.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [report] = await getReportBySlug(slug);

  if (!report) return;

  const thumb = getCldImageUrl({
    width: 1200,
    height: 630,
    src: report?.thumb ?? "none",
  });

  const description = `Report on ${report?.title}`;

  const metadata = {
    title: report?.title,
    description: description,
    openGraph: {
      title: report?.title,
      description: description,
      type: "article",
      publishedTime: report?.updatedAt,
      url: `https://aunccarmy.vercel.app/reports/${report.slug}`,
      images: [
        {
          url: thumb,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: report?.title,
      description: description,
      images: [thumb],
    },
  };

  return metadata;
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [report] = await getReportBySlug(slug);

  if (!report) return notFound();

  return (
    <div className="relative mx-auto max-w-8xl px-2">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "fixed -z-10 stroke-foreground/10 [mask-image:linear-gradient(to_bottom,white,transparent,transparent,white)]",
        )}
      />
      <ReportView report={report} />
    </div>
  );
}
