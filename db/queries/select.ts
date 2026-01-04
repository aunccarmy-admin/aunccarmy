"use server";

import { asc, count, desc, eq, sql } from "drizzle-orm";
import { db } from "../index";
import {
  SelectAno,
  SelectCadet,
  SelectGalleryImage,
  SelectPoster,
  SelectReport,
  SelectSlide,
  anoTable,
  cadetTable,
  carouselTable,
  galleryTable,
  posterTable,
  reportsTable,
} from "../schema";

export type ReportMeta = Partial<SelectReport>;

export async function getReports({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
} = {}): Promise<ReportMeta[]> {
  const baseQuery = db
    .select({
      id: reportsTable.id,
      title: reportsTable.title,
      date: reportsTable.date,
      location: reportsTable.location,
      thumb: reportsTable.thumb,
      slug: reportsTable.slug,
    })
    .from(reportsTable)
    .orderBy(desc(reportsTable.date));

  if (page !== undefined && pageSize !== undefined) {
    const offset = (page - 1) * pageSize;
    return baseQuery.limit(pageSize).offset(offset);
  }

  return baseQuery;
}

export async function getReportBySlug(
  slug: string,
): Promise<Array<SelectReport>> {
  return db
    .select()
    .from(reportsTable)
    .where(eq(reportsTable.slug, slug))
    .limit(1);
}

export async function getSlugs(): Promise<Array<string>> {
  let items = await db.select({ slug: reportsTable.slug }).from(reportsTable);
  return items.map((slug) => slug.slug);
}

export async function getCarouselRowCount(): Promise<number> {
  const res = await db.select({ count: count() }).from(carouselTable);
  return res[0]?.count ?? 1;
}

export async function getCarousel(): Promise<SelectSlide[]> {
  return db.select().from(carouselTable).orderBy(asc(carouselTable.order));
}

export async function getAnos(): Promise<SelectAno[]> {
  return db.select().from(anoTable).orderBy(asc(anoTable.end_date));
}

export async function getCadetsByYear(year: number): Promise<SelectCadet[]> {
  return db
    .select()
    .from(cadetTable)
    .where(eq(sql`EXTRACT(YEAR FROM ${cadetTable.end_date})`, year));
}

export async function getYears(): Promise<number[]> {
  const res = await db
    .select({
      year: sql<number>`EXTRACT(YEAR FROM ${cadetTable.end_date})`.as("year"),
    })
    .from(cadetTable)
    .groupBy(sql`year`)
    .orderBy(desc(sql`year`));

  return res.map((item) => item.year);
}

export async function getPosters({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}): Promise<SelectPoster[]> {
  {
    const baseQuery = db
      .select()
      .from(posterTable)
      .orderBy(desc(posterTable.date));

    if (page !== undefined && pageSize !== undefined) {
      const offset = (page - 1) * pageSize;
      return baseQuery.limit(pageSize).offset(offset);
    }

    return baseQuery;
  }
}

export async function getGalleryImages(): Promise<SelectGalleryImage[]> {
  return db.select().from(galleryTable).orderBy(desc(galleryTable.date));
}
